import { NextResponse } from "next/server";
import { saveSwipe, checkForMatch, createMatch, getSwipe } from "@/lib/kv";
import { getUserByFid, getUserByVerification } from "@/lib/neynar";
import { generateSVG, generateMetadata } from "@/lib/nft";
import { isDemoMode, getMockUser } from "@/lib/demo";

function isDemoModeCheck(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
         !process.env.NEYNAR_API_KEY ||
         !process.env.KV_REST_API_URL;
}

export async function POST(request: Request) {
  try {
    const { toFid, action, address } = await request.json();

    // Get fromFid from address or headers
    let fromFid: number | null = null;
    
    // Try to get FID from address (verification)
    if (address) {
      const user = await getUserByVerification(address);
      if (user) {
        fromFid = user.fid;
      }
    }
    
    // Fallback to header
    if (!fromFid) {
      const fromFidHeader = request.headers.get("x-fid");
      if (fromFidHeader) {
        fromFid = Number(fromFidHeader);
      }
    }

    // In demo mode, use a mock FID based on address
    if (!fromFid && isDemoModeCheck()) {
      // Generate a consistent FID from address for demo
      fromFid = address ? parseInt(address.slice(2, 10), 16) % 10000 + 1000 : 9999;
    }

    if (!fromFid) {
      return NextResponse.json(
        { error: "Missing user ID. In demo mode, this should not happen. Please check your wallet connection." },
        { status: 401 }
      );
    }

    // Save swipe (skip in demo mode if KV is not available)
    try {
      await saveSwipe({
        fromFid,
        toFid,
        action,
        timestamp: Date.now(),
      });
    } catch (kvError) {
      if (!isDemoModeCheck()) {
        throw kvError;
      }
      // In demo mode, continue without saving to KV
      console.log("Demo mode: Skipping KV save");
    }

    // Check for match if action is "fren"
    if (action === "fren") {
      let isMatch = false;
      try {
        isMatch = await checkForMatch(fromFid, toFid);
      } catch (matchError) {
        if (!isDemoModeCheck()) {
          throw matchError;
        }
        // In demo mode, simulate matches occasionally (20% chance)
        isMatch = Math.random() < 0.2;
      }

      if (isMatch) {
        // Create match
        const match = await createMatch(fromFid, toFid);

        // Get user info for NFT
        let user1 = await getUserByFid(fromFid);
        let user2 = await getUserByFid(toFid);

        // Fallback to mock users in demo mode
        if (isDemoModeCheck()) {
          if (!user1) user1 = getMockUser();
          if (!user2) user2 = getMockUser();
        }

        if (user1 && user2) {
          // Generate SVG
          const svg = generateSVG(
            user1.pfp_url,
            user2.pfp_url,
            user1.username,
            user2.username,
            match.matchNumber
          );

          // Convert SVG to data URL (in production, upload to IPFS)
          const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

          // Generate metadata
          const metadata = generateMetadata(
            user1.username,
            user2.username,
            match.matchNumber,
            svgDataUrl
          );

          // Mint NFT (simplified - in production, upload to IPFS first)
          // const nftTokenId = await mintNFT(...);

          // Post frame to Farcaster
          try {
            const frameText = `@${user1.username} and @${user2.username} just became FRENS #${match.matchNumber} 🔥`;
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/publish-frame`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: frameText,
                imageUrl: svgDataUrl,
                buttonUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/frenbase`,
              }),
            });
          } catch (frameError) {
            console.error("Failed to publish frame:", frameError);
            // Don't fail the match if frame posting fails
          }

          return NextResponse.json({
            match: {
              ...match,
              username1: user1.username,
              username2: user2.username,
              pfp1: user1.pfp_url,
              pfp2: user2.pfp_url,
              nftImageUrl: svgDataUrl,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing swipe:", error);
    return NextResponse.json(
      { error: "Failed to process swipe" },
      { status: 500 }
    );
  }
}

