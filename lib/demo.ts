import { FarcasterUser, Cast } from "@/types";

// Mock data for demo mode when APIs are not available
export const MOCK_USERS: FarcasterUser[] = [
  {
    fid: 1,
    username: "vitalik",
    display_name: "Vitalik Buterin",
    pfp_url: "https://warpcast.com/avatar/vitalik.png",
    bio: { text: "Ethereum co-founder. Building decentralized future." },
    follower_count: 500000,
    verifications: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"],
  },
  {
    fid: 2,
    username: "dwr",
    display_name: "Dan Romero",
    pfp_url: "https://warpcast.com/avatar/dwr.png",
    bio: { text: "Building Farcaster. Former Coinbase." },
    follower_count: 100000,
    verifications: ["0x1234567890123456789012345678901234567890"],
  },
  {
    fid: 3,
    username: "jessepollak",
    display_name: "Jesse Pollak",
    pfp_url: "https://warpcast.com/avatar/jessepollak.png",
    bio: { text: "Building Base. Making crypto accessible." },
    follower_count: 75000,
    verifications: ["0x2345678901234567890123456789012345678901"],
  },
  {
    fid: 4,
    username: "cdixon",
    display_name: "Chris Dixon",
    pfp_url: "https://warpcast.com/avatar/cdixon.png",
    bio: { text: "a16z crypto. Building the future of the internet." },
    follower_count: 200000,
    verifications: ["0x3456789012345678901234567890123456789012"],
  },
  {
    fid: 5,
    username: "balajis",
    display_name: "Balaji Srinivasan",
    pfp_url: "https://warpcast.com/avatar/balajis.png",
    bio: { text: "Network state. Crypto. Technology." },
    follower_count: 150000,
    verifications: ["0x4567890123456789012345678901234567890123"],
  },
];

export const MOCK_CASTS: Record<number, Cast[]> = {
  1: [
    {
      hash: "0xabc123",
      text: "Excited about the future of decentralized social networks! 🚀",
      timestamp: new Date().toISOString(),
      author: {
        username: "vitalik",
        pfp_url: "https://warpcast.com/avatar/vitalik.png",
      },
    },
  ],
  2: [
    {
      hash: "0xdef456",
      text: "Farcaster is the future of social. Join us! 🔥",
      timestamp: new Date().toISOString(),
      author: {
        username: "dwr",
        pfp_url: "https://warpcast.com/avatar/dwr.png",
      },
    },
  ],
  3: [
    {
      hash: "0xghi789",
      text: "Base is making crypto accessible to everyone. Onwards! 💙",
      timestamp: new Date().toISOString(),
      author: {
        username: "jessepollak",
        pfp_url: "https://warpcast.com/avatar/jessepollak.png",
      },
    },
  ],
  4: [
    {
      hash: "0xjkl012",
      text: "The next internet will be built on crypto. Let's build it together.",
      timestamp: new Date().toISOString(),
      author: {
        username: "cdixon",
        pfp_url: "https://warpcast.com/avatar/cdixon.png",
      },
    },
  ],
  5: [
    {
      hash: "0xmno345",
      text: "Network states are the future. Crypto enables new forms of organization.",
      timestamp: new Date().toISOString(),
      author: {
        username: "balajis",
        pfp_url: "https://warpcast.com/avatar/balajis.png",
      },
    },
  ],
};

let mockUserIndex = 0;

export function getMockUser(): FarcasterUser {
  const user = MOCK_USERS[mockUserIndex % MOCK_USERS.length];
  mockUserIndex++;
  return user;
}

export function getMockCast(fid: number): Cast | null {
  return MOCK_CASTS[fid]?.[0] || null;
}

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
         !process.env.NEYNAR_API_KEY ||
         !process.env.KV_REST_API_URL;
}

