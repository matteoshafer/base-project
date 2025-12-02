import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { FarcasterUser, Cast } from "@/types";

const neynarClient = new NeynarAPIClient(
  process.env.NEYNAR_API_KEY || ""
);

export async function getRandomUsers(count: number = 1): Promise<FarcasterUser[]> {
  try {
    const response = await neynarClient.searchUser("", {
      limit: 100,
    });

    // Filter for verified users with >100 followers
    const filtered = response.result.users.filter(
      (user) =>
        user.verifications.length > 0 &&
        user.follower_count > 100
    );

    // Shuffle and return random users
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((user) => ({
      fid: user.fid,
      username: user.username,
      display_name: user.display_name,
      pfp_url: user.pfp_url,
      bio: { text: user.profile.bio?.text || "" },
      follower_count: user.follower_count,
      verifications: user.verifications,
    }));
  } catch (error) {
    console.error("Error fetching users from Neynar:", error);
    return [];
  }
}

export async function getUserCasts(fid: number, limit: number = 1): Promise<Cast[]> {
  try {
    const response = await neynarClient.fetchCastsForUser(fid, {
      limit,
    });

    return response.result.casts.map((cast) => ({
      hash: cast.hash,
      text: cast.text,
      timestamp: cast.timestamp,
      author: {
        username: cast.author.username,
        pfp_url: cast.author.pfp_url,
      },
    }));
  } catch (error) {
    console.error("Error fetching casts:", error);
    return [];
  }
}

export async function getUserByFid(fid: number): Promise<FarcasterUser | null> {
  try {
    const response = await neynarClient.lookupUserByFid(fid);
    const user = response.result.user;

    return {
      fid: user.fid,
      username: user.username,
      display_name: user.display_name,
      pfp_url: user.pfp_url,
      bio: { text: user.profile.bio?.text || "" },
      follower_count: user.follower_count,
      verifications: user.verifications,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUserByVerification(address: string): Promise<FarcasterUser | null> {
  try {
    // Neynar API: lookup user by verification address
    // Note: The exact method name may vary - check Neynar SDK docs
    const response = await neynarClient.searchUser(address, {
      limit: 1,
    });

    // Find user with matching verification
    const user = response.result.users.find((u) =>
      u.verifications.some((v) => v.toLowerCase() === address.toLowerCase())
    );

    if (user) {
      return {
        fid: user.fid,
        username: user.username,
        display_name: user.display_name,
        pfp_url: user.pfp_url,
        bio: { text: user.profile.bio?.text || "" },
        follower_count: user.follower_count,
        verifications: user.verifications,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user by verification:", error);
    return null;
  }
}

export async function publishFrame(
  signerUuid: string,
  text: string,
  imageUrl: string,
  buttonUrl: string
): Promise<boolean> {
  try {
    await neynarClient.publishCast(signerUuid, {
      text,
      embeds: [
        {
          url: imageUrl,
        },
      ],
      channelId: "frenfire",
    });

    // Note: Frame creation requires additional setup with Neynar
    // For MVP, we'll post a cast with the image and link
    return true;
  } catch (error) {
    console.error("Error publishing frame:", error);
    return false;
  }
}

