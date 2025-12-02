import { NextResponse } from "next/server";
import { getTopUsers } from "@/lib/kv";
import { getUserByFid } from "@/lib/neynar";
import { LeaderboardEntry } from "@/types";

export async function GET() {
  try {
    const topUsers = await getTopUsers(10);

    const leaderboard: LeaderboardEntry[] = await Promise.all(
      topUsers.map(async ({ fid, matches }) => {
        const user = await getUserByFid(fid);
        return {
          fid,
          username: user?.username || `User ${fid}`,
          pfp: user?.pfp_url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='40' fill='%23999' text-anchor='middle' dy='.3em'%3E👤%3C/text%3E%3C/svg%3E",
          matches,
          rarestMatch: matches > 0 ? 1 : undefined, // Simplified - would calculate actual rarest
        };
      })
    );

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

