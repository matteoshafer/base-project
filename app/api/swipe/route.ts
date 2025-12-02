import { NextResponse } from "next/server";
import { saveSwipe, checkForMatch, createMatch, getSwipe } from "@/lib/kv";
import { getUserByFid, getUserByVerification } from "@/lib/neynar";
import { generateSVG, generateMetadata } from "@/lib/nft";

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

    if (!fromFid) {
      return NextResponse.json(
        { error: "Missing user ID. Please connect your Farcaster account." },
        { status: 401 }
      );
    }

    // Save swipe
    await saveSwipe({
      fromFid,
      toFid,
      action,
      timestamp: Date.now(),
    });

    // Check for match if action is "fren"
    if (action === "fren") {
      const isMatch = await checkForMatch(fromFid, toFid);

      if (isMatch) {
        // Create match
        const match = await createMatch(fromFid, toFid);

        // Get user info for NFT
        const user1 = await getUserByFid(fromFid);
        const user2 = await getUserByFid(toFid);

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
                buttonUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/frenfire`,
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

