import { NextResponse } from "next/server";
import { getRandomUsers, getUserCasts } from "@/lib/neynar";

export async function GET() {
  try {
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
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

