import { kv } from "@vercel/kv";
import { Swipe, Match } from "@/types";

const SWIPE_PREFIX = "swipe:";
const MATCH_PREFIX = "match:";
const MATCH_COUNTER_KEY = "match_counter";
const USER_MATCHES_PREFIX = "user_matches:";
const PENDING_MATCH_PREFIX = "pending_match:";

export async function saveSwipe(swipe: Swipe): Promise<void> {
  const key = `${SWIPE_PREFIX}${swipe.fromFid}:${swipe.toFid}`;
  await kv.set(key, swipe, { ex: 86400 * 2 }); // 2 days TTL
}

export async function getSwipe(fromFid: number, toFid: number): Promise<Swipe | null> {
  const key = `${SWIPE_PREFIX}${fromFid}:${toFid}`;
  return await kv.get(key);
}

export async function checkForMatch(fid1: number, fid2: number): Promise<boolean> {
  const swipe1 = await getSwipe(fid1, fid2);
  const swipe2 = await getSwipe(fid2, fid1);

  if (
    swipe1?.action === "fren" &&
    swipe2?.action === "fren" &&
    Math.abs(swipe1.timestamp - swipe2.timestamp) < 86400000 // 24 hours
  ) {
    return true;
  }
  return false;
}

export async function createMatch(fid1: number, fid2: number): Promise<Match> {
  // Get next match number
  const matchNumber = await kv.incr(MATCH_COUNTER_KEY);

  const match: Match = {
    fid1,
    fid2,
    matchNumber,
    timestamp: Date.now(),
  };

  // Save match
  const matchKey = `${MATCH_PREFIX}${fid1}:${fid2}`;
  await kv.set(matchKey, match);

  // Update user match counts
  await kv.incr(`${USER_MATCHES_PREFIX}${fid1}`);
  await kv.incr(`${USER_MATCHES_PREFIX}${fid2}`);

  return match;
}

export async function getMatch(fid1: number, fid2: number): Promise<Match | null> {
  const matchKey = `${MATCH_PREFIX}${fid1}:${fid2}`;
  return await kv.get(matchKey);
}

export async function getUserMatchCount(fid: number): Promise<number> {
  const count = await kv.get(`${USER_MATCHES_PREFIX}${fid}`);
  return count ? Number(count) : 0;
}

export async function getTopUsers(limit: number = 10): Promise<Array<{ fid: number; matches: number }>> {
  // This is a simplified version - in production, you'd want to use a sorted set
  const keys = await kv.keys(`${USER_MATCHES_PREFIX}*`);
  const users = await Promise.all(
    keys.map(async (key) => {
      const fid = Number(key.replace(USER_MATCHES_PREFIX, ""));
      const matches = await getUserMatchCount(fid);
      return { fid, matches };
    })
  );

  return users.sort((a, b) => b.matches - a.matches).slice(0, limit);
}

