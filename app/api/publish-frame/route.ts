import { NextResponse } from "next/server";
import { publishFrame } from "@/lib/neynar";

export async function POST(request: Request) {
  try {
    const { text, imageUrl, buttonUrl } = await request.json();
    const signerUuid = process.env.NEYNAR_SIGNER_UUID;

    if (!signerUuid) {
      return NextResponse.json(
        { error: "Neynar signer not configured" },
        { status: 500 }
      );
    }

    const success = await publishFrame(signerUuid, text, imageUrl, buttonUrl);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to publish frame" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error publishing frame:", error);
    return NextResponse.json(
      { error: "Failed to publish frame" },
      { status: 500 }
    );
  }
}

