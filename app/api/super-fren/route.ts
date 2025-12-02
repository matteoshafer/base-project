import { NextResponse } from "next/server";
import { saveSwipe, checkForMatch, createMatch } from "@/lib/kv";
import { getUserByFid, getUserByVerification } from "@/lib/neynar";

export async function POST(request: Request) {
  try {
    const { toFid, address } = await request.json();

    // Get fromFid from address or headers
    let fromFid: number | null = null;
    
    if (address) {
      const user = await getUserByVerification(address);
      if (user) {
        fromFid = user.fid;
      }
    }
    
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

    // Save super fren swipe
    await saveSwipe({
      fromFid,
      toFid,
      action: "fren",
      timestamp: Date.now(),
      superFren: true,
    });

    // Check for match
    const isMatch = await checkForMatch(fromFid, toFid);

    if (isMatch) {
      const match = await createMatch(fromFid, toFid);
      const user1 = await getUserByFid(fromFid);
      const user2 = await getUserByFid(toFid);

      // Send push notification (implement with your push service)
      // await sendPushNotification(...);

      return NextResponse.json({
        match: {
          ...match,
          username1: user1?.username,
          username2: user2?.username,
          pfp1: user1?.pfp_url,
          pfp2: user2?.pfp_url,
        },
      });
    }

    return NextResponse.json({ success: true, superFren: true });
  } catch (error) {
    console.error("Error processing super fren:", error);
    return NextResponse.json(
      { error: "Failed to process super fren" },
      { status: 500 }
    );
  }
}

