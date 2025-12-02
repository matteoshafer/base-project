# FrenFire Project Structure

## Overview

FrenFire is a complete, gasless "Tinder for Frens" mini-app built on Base and Farcaster.

## Directory Structure

```
frenfire/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── get-user/            # Fetch random Farcaster users
│   │   ├── swipe/                # Handle swipe actions
│   │   ├── super-fren/           # Handle Super Fren payments
│   │   ├── leaderboard/         # Get leaderboard data
│   │   └── publish-frame/        # Publish frames to Farcaster
│   ├── frenfire/                 # Deep link handler for frames
│   ├── leaderboard/              # Leaderboard page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main swipe screen
│   ├── providers.tsx             # Wallet providers (OnchainKit)
│   └── globals.css               # Global styles
│
├── components/                    # React Components
│   ├── swipe-screen.tsx          # Main swipe interface
│   ├── user-card.tsx             # User profile card
│   ├── action-buttons.tsx        # FREN/PASS buttons
│   ├── super-fren-button.tsx    # Super Fren feature
│   ├── match-celebration.tsx    # Match celebration modal
│   └── ui/                       # Reusable UI components
│       └── button.tsx
│
├── lib/                          # Utility Libraries
│   ├── neynar.ts                 # Neynar API integration
│   ├── kv.ts                     # Vercel KV storage
│   ├── contract.ts               # Onchain contract interaction
│   ├── nft.ts                    # NFT generation and minting
│   ├── auth.ts                   # Authentication utilities
│   ├── utils.ts                  # General utilities
│   └── constants.ts              # App constants
│
├── types/                        # TypeScript Types
│   └── index.ts                  # Type definitions
│
├── contracts/                    # Smart Contracts
│   └── FrenFire.sol              # Onchain storage contract
│
├── public/                        # Static Assets
│
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.js                # Next.js config
├── vercel.json                   # Vercel deployment config
├── README.md                     # Main documentation
└── DEPLOY.md                     # Deployment guide
```

## Key Features

### 1. Swipe Interface (`components/swipe-screen.tsx`)
- Fetches random Farcaster users
- Displays user card with PFP, bio, and latest cast
- Handles swipe actions (FREN/PASS)

### 2. Match Logic (`lib/kv.ts` or `lib/contract.ts`)
- Stores swipes in Vercel KV (or onchain)
- Detects matches when both users fren each other within 24h
- Creates match records with unique match numbers

### 3. NFT Minting (`lib/nft.ts`)
- Generates SVG NFT fusing both user PFPs
- Mints on Zora (gasless via Base Paymaster)
- Creates metadata with match information

### 4. Farcaster Integration (`lib/neynar.ts`)
- Fetches random verified users with >100 followers
- Gets user casts
- Publishes frames to Farcaster on matches

### 5. Super Fren (`components/super-fren-button.tsx`)
- Premium feature costing 0.001 ETH
- Golden animation
- Guaranteed notification

### 6. Leaderboard (`app/leaderboard/page.tsx`)
- Shows top fren-makers
- Displays rarest match numbers
- Updates in real-time

## Data Flow

1. **User Discovery**: `app/api/get-user` → Neynar API → Random verified user
2. **Swipe Action**: `app/api/swipe` → Save to KV → Check for match
3. **Match Detection**: Both users frenned → Create match → Mint NFT → Post frame
4. **Celebration**: Show confetti → Display NFT → Share option

## Storage Options

### Option 1: Vercel KV (Current)
- Fast and simple
- Good for MVP
- Located in `lib/kv.ts`

### Option 2: Onchain Contract
- Fully decentralized
- More expensive (but gasless with paymaster)
- Located in `contracts/FrenFire.sol` and `lib/contract.ts`

## API Integrations

- **Neynar**: Farcaster user data and frame posting
- **OnchainKit**: Wallet connection and gasless transactions
- **Base Paymaster**: Gasless transactions
- **Zora**: NFT minting (to be implemented)
- **Vercel KV**: Swipe and match storage

## Environment Variables

See `README.md` for complete list of required environment variables.

## Next Steps

1. Get API keys (Neynar, OnchainKit)
2. Set up Vercel KV database
3. Configure Base Paymaster
4. (Optional) Deploy smart contract
5. Deploy to Vercel
6. Test and iterate!

