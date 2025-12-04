import { FarcasterUser, Cast } from "@/types";

// Default avatar SVG data URI - properly encoded
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23FF6B35'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3E%F0%9F%94%A5%3C/text%3E%3C/svg%3E";

// Mock data for demo mode when APIs are not available
export const MOCK_USERS: FarcasterUser[] = [
  {
    fid: 1,
    username: "vitalik",
    display_name: "Vitalik Buterin",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "Ethereum co-founder. Building decentralized future. 🚀" },
    follower_count: 500000,
    verifications: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"],
  },
  {
    fid: 2,
    username: "dwr",
    display_name: "Dan Romero",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "Building Farcaster. Former Coinbase. Making social onchain." },
    follower_count: 100000,
    verifications: ["0x1234567890123456789012345678901234567890"],
  },
  {
    fid: 3,
    username: "jessepollak",
    display_name: "Jesse Pollak",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "Building Base. Making crypto accessible to everyone. 💙" },
    follower_count: 75000,
    verifications: ["0x2345678901234567890123456789012345678901"],
  },
  {
    fid: 4,
    username: "cdixon",
    display_name: "Chris Dixon",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "a16z crypto. Building the future of the internet. 🌐" },
    follower_count: 200000,
    verifications: ["0x3456789012345678901234567890123456789012"],
  },
  {
    fid: 5,
    username: "balajis",
    display_name: "Balaji Srinivasan",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "Network state. Crypto. Technology. The future is decentralized." },
    follower_count: 150000,
    verifications: ["0x4567890123456789012345678901234567890123"],
  },
  {
    fid: 6,
    username: "elonmusk",
    display_name: "Elon Musk",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "Mars, rockets, and memes. Building the future. 🚀" },
    follower_count: 1000000,
    verifications: ["0x5678901234567890123456789012345678901234"],
  },
  {
    fid: 7,
    username: "saylor",
    display_name: "Michael Saylor",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "Bitcoin maximalist. Building the future of money. ₿" },
    follower_count: 300000,
    verifications: ["0x6789012345678901234567890123456789012345"],
  },
  {
    fid: 8,
    username: "naval",
    display_name: "Naval Ravikant",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "AngelList founder. Philosophy, wealth, and wisdom." },
    follower_count: 400000,
    verifications: ["0x7890123456789012345678901234567890123456"],
  },
  {
    fid: 9,
    username: "paulg",
    display_name: "Paul Graham",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "Y Combinator co-founder. Essays on startups and life." },
    follower_count: 250000,
    verifications: ["0x8901234567890123456789012345678901234567"],
  },
  {
    fid: 10,
    username: "marc",
    display_name: "Marc Andreessen",
    pfp_url: DEFAULT_AVATAR,
    bio: { text: "a16z co-founder. Building the future of technology." },
    follower_count: 180000,
    verifications: ["0x9012345678901234567890123456789012345678"],
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
        pfp_url: DEFAULT_AVATAR,
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
        pfp_url: DEFAULT_AVATAR,
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
        pfp_url: DEFAULT_AVATAR,
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
        pfp_url: DEFAULT_AVATAR,
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
        pfp_url: DEFAULT_AVATAR,
      },
    },
  ],
  6: [
    {
      hash: "0xmars001",
      text: "To Mars and beyond! 🚀 The future is interplanetary.",
      timestamp: new Date().toISOString(),
      author: {
        username: "elonmusk",
        pfp_url: DEFAULT_AVATAR,
      },
    },
  ],
  7: [
    {
      hash: "0xbtc001",
      text: "Bitcoin is digital gold. Stack sats, not fiat. ₿",
      timestamp: new Date().toISOString(),
      author: {
        username: "saylor",
        pfp_url: DEFAULT_AVATAR,
      },
    },
  ],
  8: [
    {
      hash: "0xwisdom01",
      text: "The best way to get rich is to own assets that appreciate faster than inflation.",
      timestamp: new Date().toISOString(),
      author: {
        username: "naval",
        pfp_url: DEFAULT_AVATAR,
      },
    },
  ],
  9: [
    {
      hash: "0xstartup01",
      text: "Do things that don't scale. Start small, think big.",
      timestamp: new Date().toISOString(),
      author: {
        username: "paulg",
        pfp_url: DEFAULT_AVATAR,
      },
    },
  ],
  10: [
    {
      hash: "0xtech01",
      text: "Software is eating the world. Build the future.",
      timestamp: new Date().toISOString(),
      author: {
        username: "marc",
        pfp_url: DEFAULT_AVATAR,
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
  const cast = MOCK_CASTS[fid]?.[0];
  if (cast) return cast;
  
  // Return a default cast if none exists for this FID
  return {
    hash: `0x${fid.toString(16)}`,
    text: "Building the future of decentralized social! 🔥",
    timestamp: new Date().toISOString(),
    author: {
      username: "fren",
      pfp_url: DEFAULT_AVATAR,
    },
  };
}

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true" || 
         !process.env.NEYNAR_API_KEY ||
         !process.env.KV_REST_API_URL;
}

// Generate a consistent mock wallet address for demo mode
export function getMockWalletAddress(): `0x${string}` {
  // Generate a consistent address based on session/localStorage
  if (typeof window !== 'undefined') {
    let mockAddress = localStorage.getItem('demo_wallet_address');
    if (!mockAddress) {
      // Generate a random but consistent address
      const randomBytes = Array.from({ length: 20 }, () => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
      ).join('');
      mockAddress = `0x${randomBytes}`;
      localStorage.setItem('demo_wallet_address', mockAddress);
    }
    return mockAddress as `0x${string}`;
  }
  // Fallback for server-side
  return "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" as `0x${string}`;
}

