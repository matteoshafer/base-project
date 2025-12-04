# FrenBase 🔥 - Tinder for crypto frens

**Base Track Hackathon Submission**

A gasless, viral mini-app built on Base and Farcaster that lets you swipe on frens, match, and mint NFTs.

---

## Table of Contents

- [Team Members](#team-members)
- [Project Description](#project-description)
- [Technical Summary](#technical-summary)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Quick Start](#quick-start)
- [Local Run Steps](#local-run-steps)
- [Setup](#setup)
- [Deployment](#deployment)
- [Smart Contract](#smart-contract)
- [Deployed Contract Address](#deployed-contract-address)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Base Integration](#base-integration)
- [License](#license)

---

## Team Members

**Team Name**: FrenBase Team

- **Names**
-  Developer, Matteo Shafer
   - Role: Full-stack development, smart contracts, Base integration
- Developer, Hunter Barthel
   - Role: Full-stack development, smart contracts, Base integration

---

## Project Description

FrenBase is a gasless, viral social discovery app that brings the Tinder experience to Farcaster. Users swipe through verified Farcaster profiles, match with mutual interests, and automatically mint unique 1/1 NFTs commemorating each connection—all without paying gas fees thanks to Base Paymaster.

Built entirely on Base L2, FrenBase leverages smart wallets and account abstraction to create a frictionless onchain experience. When users match, the app generates beautiful SVG NFTs fusing both profile pictures, posts celebratory frames to Farcaster, and tracks a leaderboard of top "fren-makers." The platform combines Base's low fees and fast finality with Farcaster's social graph to create engaging, viral mechanics that make onchain interactions simple and fun.

**Key Innovation**: First gasless "Tinder for Farcaster" with automatic NFT minting, fully built on Base infrastructure.

---

## Technical Summary

### Problem Being Solved

Current social discovery platforms lack onchain identity, verifiable connections, and meaningful digital ownership. Users want to discover new connections in the Farcaster ecosystem, but existing tools don't leverage blockchain for creating permanent, ownable relationship records. Additionally, gas fees create friction that prevents mainstream adoption of onchain social features.

### Layer 2 Advantages

**Base L2 provides critical advantages for FrenBase:**

1. **Gasless UX**: Base Paymaster enables completely gasless transactions, removing the primary barrier to onchain adoption
2. **Fast Finality**: Sub-second transaction finality ensures smooth, responsive user experience
3. **Low Costs**: Even when users pay, Base's low fees make NFT minting and onchain storage economically viable
4. **EVM Compatibility**: Full EVM compatibility means seamless integration with existing tools (Wagmi, Viem, smart wallets)
5. **Scalability**: Base can handle millions of users, essential for a viral social app

### EVM Stack Usage

FrenBase leverages the full EVM stack:

- **Smart Contracts**: Solidity contract (`FrenBase.sol`) for onchain swipe/match storage
- **Wagmi + Viem**: TypeScript libraries for wallet interactions and contract calls
- **Base Chain**: Deployed on Base Mainnet/Sepolia with full EVM compatibility
- **ERC-4337**: Account abstraction via Base Paymaster for gasless transactions
- **Smart Wallets**: Coinbase Smart Wallet support for seamless onboarding
- **Web3 Libraries**: Full TypeScript/React integration with EVM tooling

---

## Features

- 🔥 **Swipe Interface**: Beautiful Tinder-like UI for discovering Farcaster users
- 💎 **Gasless Everything**: Powered by Coinbase Smart Wallet + Base Paymaster
- 🎨 **Match NFTs**: Automatic 1/1 SVG NFT minting on Zora when you match
- 📱 **Farcaster Integration**: Auto-post frames to Farcaster on matches
- 🏆 **Leaderboard**: Track top fren-makers and rarest match numbers
- ✨ **Super Fren**: Premium feature with golden animation and guaranteed notifications
- 🎉 **Confetti Celebrations**: Beautiful match animations

---

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Blockchain**: Base L2 (Mainnet/Sepolia)
- **Wallet**: Wagmi + Viem (Coinbase Smart Wallet support)
- **Gasless**: Base Paymaster (ERC-4337 Account Abstraction)
- **UI Components**: shadcn/ui + Tailwind CSS
- **Storage**: Vercel KV (upgradeable to onchain contract)
- **APIs**: Neynar (Farcaster), Zora (NFTs)
- **Animations**: Framer Motion + Canvas Confetti

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Swipe Screen │  │ Leaderboard  │  │ Match Modal  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  API Routes (Next.js API)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ get-user │  │  swipe   │  │super-fren│  │leaderboard│   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
└───────┼─────────────┼─────────────┼─────────────┼──────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Neynar  │  │ Vercel KV│  │   Zora   │  │  Base    │  │
│  │   API    │  │ Storage  │  │   NFTs   │  │Paymaster │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  Base Blockchain (L2)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         FrenBase.sol Smart Contract                  │  │
│  │  (Stores swipes, matches, match counts onchain)      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User connects wallet (Wagmi → Base Paymaster → Gasless)
2. Frontend fetches Farcaster users via Neynar API
3. User swipes → API saves to Vercel KV (or onchain contract)
4. Match detected → NFT generated → Frame posted to Farcaster
5. Leaderboard updates from onchain/offchain data

---

## Quick Start

```bash
# Clone and install
npm install

# Create .env.local file (see Setup section)
# For demo mode, just add:
# NEXT_PUBLIC_DEMO_MODE=true

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and start swiping! 🔥

---

## Local Run Steps

### 1. Clone Repository

```bash
git clone <your-github-repo-url>
cd base-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create `.env.local` in the root directory:

```env
# Demo Mode (no APIs needed)
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BASE_PAYMASTER_RPC=https://paymaster.base.org

# OR Full Setup (with APIs)
NEYNAR_API_KEY=your_key
KV_REST_API_URL=your_url
KV_REST_API_TOKEN=your_token
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Open Browser

Navigate to `http://localhost:3000`

### 6. Connect Wallet

- Click "Connect Wallet"
- Select Coinbase Wallet or MetaMask
- Switch to Base network if needed

---

## Setup

### Environment Variables

**Create a `.env.local` file in the root directory** (same folder as `package.json`):

```env
# Base Configuration
NEXT_PUBLIC_BASE_PAYMASTER_RPC=https://paymaster.base.org
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Demo Mode (no APIs needed)
NEXT_PUBLIC_DEMO_MODE=true

# Optional: Full API Setup
NEYNAR_API_KEY=your_neynar_api_key
NEYNAR_SIGNER_UUID=your_neynar_signer_uuid
KV_REST_API_URL=your_vercel_kv_url
KV_REST_API_TOKEN=your_vercel_kv_token
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key

# Optional: Contract Addresses
NEXT_PUBLIC_FRENBASE_CONTRACT=0x... # Deployed FrenBase contract
NEXT_PUBLIC_SUPER_FREN_CONTRACT=0x... # Super Fren contract
```

### Get API Keys

1. **Neynar API**: Sign up at [neynar.com](https://neynar.com)
2. **Vercel KV**: Create KV database in [Vercel Dashboard](https://vercel.com)
3. **OnchainKit**: Get from [Coinbase Developer Portal](https://portal.cdp.coinbase.com/)
4. **Base Paymaster**: Use public RPC `https://paymaster.base.org`

---

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` is already configured.

---

## Smart Contract

A Solidity contract (`contracts/FrenBase.sol`) provides fully onchain storage:

- Stores swipes and matches onchain
- Tracks match counts per user
- Emits events for indexing
- Fully EVM compatible (Base L2)

**To use the contract:**

1. Deploy to Base Mainnet or Base Sepolia
2. Set `NEXT_PUBLIC_FRENBASE_CONTRACT` in env vars
3. Update `lib/kv.ts` to use `lib/contract.ts`

---

## Deployed Contract Address

**Base Mainnet**: `TBD` (Not yet deployed)

**Base Sepolia**: `TBD` (Not yet deployed)

*Contract deployment instructions:*
1. Compile contract: `npx hardhat compile` (if using Hardhat)
2. Deploy to Base: Use Remix, Hardhat, or Foundry
3. Update this README with deployed address
4. Add address to `.env.local`

---

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── get-user/     # Fetch random Farcaster users
│   │   ├── swipe/        # Handle swipe actions
│   │   ├── super-fren/   # Handle Super Fren payments
│   │   └── leaderboard/  # Get leaderboard data
│   ├── leaderboard/      # Leaderboard page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main swipe screen
│   └── providers.tsx     # Wallet providers (Wagmi)
├── components/
│   ├── swipe-screen.tsx  # Main swipe interface
│   ├── user-card.tsx     # User profile card
│   ├── action-buttons.tsx # FREN/PASS buttons
│   ├── super-fren-button.tsx # Super Fren feature
│   └── match-celebration.tsx # Match celebration modal
├── lib/
│   ├── wagmi.ts          # Wagmi configuration (Base chain)
│   ├── neynar.ts         # Neynar API integration
│   ├── kv.ts             # Vercel KV storage
│   ├── contract.ts       # Onchain contract interaction
│   ├── nft.ts            # NFT generation and minting
│   └── demo.ts           # Demo mode mock data
├── contracts/
│   └── FrenBase.sol      # Smart contract for onchain storage
└── types/
    └── index.ts          # TypeScript types
```

---

## How It Works

1. **User Discovery**: Fetches random verified Farcaster users with >100 followers via Neynar API
2. **Swipe Storage**: Stores swipes in Vercel KV (upgradeable to onchain contract)
3. **Match Detection**: Checks if both users frenned each other within 24 hours
4. **NFT Minting**: On match, generates SVG NFT fusing both PFPs and mints on Zora (gasless via Base Paymaster)
5. **Frame Posting**: Auto-posts a Frame to Farcaster announcing the match
6. **Celebration**: Shows confetti animation and share options

---

## Base Integration

FrenBase leverages Base infrastructure extensively:

✅ **Base L2**: All transactions on Base Mainnet/Sepolia  
✅ **Base Paymaster**: Gasless transactions via ERC-4337  
✅ **Smart Wallets**: Coinbase Smart Wallet support  
✅ **Wagmi + Viem**: Full EVM compatibility  
✅ **Low Fees**: Base's low costs enable NFT minting  
✅ **Fast Finality**: Sub-second transaction confirmation  

**Optional Integrations** (Future):
- BaseScan API for onchain data queries
- AgentKit for enhanced wallet features
- x402 for payment infrastructure

---

## License

MIT

---

## Support

For issues and questions:
- Open an issue on GitHub
- Reach out on Farcaster @yourhandle

---

**Built with 🔥 on Base**

**GitHub Repository**: (https://github.com/matteoshafer/base-project/tree/main)

**Demo Video**: [Add your demo video link here]
