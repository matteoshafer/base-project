export interface FarcasterUser {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  bio: {
    text: string;
  };
  follower_count: number;
  verifications: string[];
}

export interface Cast {
  hash: string;
  text: string;
  timestamp: string;
  author: {
    username: string;
    pfp_url: string;
  };
}

export interface Swipe {
  fromFid: number;
  toFid: number;
  action: "fren" | "pass";
  timestamp: number;
  superFren?: boolean;
}

export interface Match {
  fid1: number;
  fid2: number;
  matchNumber: number;
  timestamp: number;
  nftTokenId?: string;
  nftImageUrl?: string;
}

export interface LeaderboardEntry {
  fid: number;
  username: string;
  pfp: string;
  matches: number;
  rarestMatch?: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

