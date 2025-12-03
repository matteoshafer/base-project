import { NextResponse } from "next/server";
import { getRandomUsers, getUserCasts } from "@/lib/neynar";
import { getMockUser, getMockCast } from "@/lib/demo";

function isDemoModeCheck(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
         !process.env.NEYNAR_API_KEY ||
         !process.env.KV_REST_API_URL;
}

export async function GET() {
  try {
    // Use demo mode if APIs are not configured
    if (isDemoModeCheck()) {
      const user = getMockUser();
      const cast = getMockCast(user.fid);
      return NextResponse.json({ user, cast });
    }

    const users = await getRandomUsers(1);
    if (users.length === 0) {
      return NextResponse.json({ user: null, cast: null });
    }

    const user = users[0];
    const casts = await getUserCasts(user.fid, 1);
    const cast = casts.length > 0 ? casts[0] : null;

    return NextResponse.json({ user, cast });
  } catch (error) {
    console.error("Error fetching user:", error);
    
    // Fallback to demo mode on error
    try {
      const user = getMockUser();
      const cast = getMockCast(user.fid);
      return NextResponse.json({ user, cast });
    } catch (demoError) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }
  }
}

