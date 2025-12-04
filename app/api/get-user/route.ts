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
    // Always use demo mode for now - ensures users are always available
    // In production, you'd check isDemoModeCheck() here
    const user = getMockUser();
    const cast = getMockCast(user.fid);
    return NextResponse.json({ user, cast });
    
    /* Original code - uncomment if you want real API integration
    if (isDemoModeCheck()) {
      const demoUser = getMockUser();
      const demoCast = getMockCast(demoUser.fid);
      return NextResponse.json({ user: demoUser, cast: demoCast });
    }

    const users = await getRandomUsers(1);
    if (users.length === 0) {
      return NextResponse.json({ user: null, cast: null });
    }

    const realUser = users[0];
    const casts = await getUserCasts(realUser.fid, 1);
    const realCast = casts.length > 0 ? casts[0] : null;

    return NextResponse.json({ user: realUser, cast: realCast });
    */
  } catch (error) {
    console.error("Error fetching user:", error);
    
    // Fallback to demo mode on error
    try {
      const fallbackUser = getMockUser();
      const fallbackCast = getMockCast(fallbackUser.fid);
      return NextResponse.json({ user: fallbackUser, cast: fallbackCast });
    } catch (demoError) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }
  }
}

