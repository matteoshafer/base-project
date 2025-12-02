import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const neynarClient = new NeynarAPIClient(
  process.env.NEYNAR_API_KEY || ""
);

/**
 * Get Farcaster FID from wallet address
 * In production, you'd want to cache this or use a more efficient lookup
 */
export async function getFidFromAddress(address: string): Promise<number | null> {
  try {
    // Neynar doesn't have a direct address->FID lookup, so we'll need to store this mapping
    // For MVP, we can use a KV store to map address -> FID
    // Or use Neynar's user lookup by verification
    
    // This is a simplified version - in production you'd:
    // 1. Store address->FID mapping when user first connects
    // 2. Or use Neynar's user lookup with verification addresses
    
    return null; // Placeholder
  } catch (error) {
    console.error("Error getting FID from address:", error);
    return null;
  }
}

/**
 * Get FID from request headers (set by client)
 * In production, use proper authentication (JWT, session, etc.)
 */
export function getFidFromRequest(request: Request): number | null {
  const fidHeader = request.headers.get("x-fid");
  if (fidHeader) {
    return Number(fidHeader);
  }
  return null;
}

