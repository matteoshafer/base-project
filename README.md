# FrenFire 🔥 - Tinder for Frens

A gasless, viral mini-app built on Base and Farcaster that lets you swipe on frens, match, and mint NFTs.

## Features

- 🔥 **Swipe Interface**: Beautiful Tinder-like UI for discovering Farcaster users
- 💎 **Gasless Everything**: Powered by Coinbase Smart Wallet + Base Paymaster
- 🎨 **Match NFTs**: Automatic 1/1 SVG NFT minting on Zora when you match
- 📱 **Farcaster Integration**: Auto-post frames to Farcaster on matches
- 🏆 **Leaderboard**: Track top fren-makers and rarest match numbers
- ✨ **Super Fren**: Premium feature with golden animation and guaranteed notifications
- 🎉 **Confetti Celebrations**: Beautiful match animations

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Wallet**: Coinbase Smart Wallet + Base Paymaster
- **UI Components**: Minikit (OnchainKit) + shadcn/ui + Tailwind CSS
- **Storage**: Vercel KV (can be upgraded to onchain)
- **APIs**: Neynar (Farcaster), Zora (NFTs)
- **Animations**: Framer Motion + Canvas Confetti

## Quick Start

```bash
# Clone and install
npm install

# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local
# (See Environment Variables section below)

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and start swiping! 🔥

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

**Create a `.env.local` file in the root directory** (same folder as `package.json`):

**Quick way:** Copy the example file:
```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your actual API keys.

```env
# OnchainKit
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key

# Base Paymaster
NEXT_PUBLIC_BASE_PAYMASTER_RPC=https://paymaster.base.org

# Neynar API
NEYNAR_API_KEY=your_neynar_api_key
NEYNAR_SIGNER_UUID=your_neynar_signer_uuid

# Vercel KV
KV_REST_API_URL=your_vercel_kv_url
KV_REST_API_TOKEN=your_vercel_kv_token

# Zora (optional - for NFT minting)
ZORA_CONTRACT_ADDRESS=0x...

# Super Fren Contract (optional)
NEXT_PUBLIC_SUPER_FREN_CONTRACT=0x...

# App URL
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 3. Get API Keys

1. **OnchainKit API Key**: Get from [Coinbase Developer Portal](https://portal.cdp.coinbase.com/)
2. **Neynar API Key**: Sign up at [Neynar](https://neynar.com) and get your API key
3. **Neynar Signer UUID**: Create a signer in Neynar dashboard for posting frames
4. **Vercel KV**: Create a KV database in your Vercel dashboard
5. **Base Paymaster**: Use the public Base Paymaster RPC or set up your own

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` is already configured.

### Custom Domain

Add your custom domain in Vercel settings and update `NEXT_PUBLIC_APP_URL` in environment variables.

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
│   └── providers.tsx     # Wallet providers
├── components/
│   ├── swipe-screen.tsx  # Main swipe interface
│   ├── user-card.tsx     # User profile card
│   ├── action-buttons.tsx # FREN/PASS buttons
│   ├── super-fren-button.tsx # Super Fren feature
│   └── match-celebration.tsx # Match celebration modal
├── lib/
│   ├── neynar.ts         # Neynar API integration
│   ├── kv.ts             # Vercel KV storage
│   └── nft.ts            # NFT generation and minting
└── types/
    └── index.ts          # TypeScript types
```

## How It Works

1. **User Discovery**: Fetches random verified Farcaster users with >100 followers via Neynar API
2. **Swipe Storage**: Stores swipes in Vercel KV (can be upgraded to onchain contract)
3. **Match Detection**: Checks if both users frenned each other within 24 hours
4. **NFT Minting**: On match, generates SVG NFT fusing both PFPs and mints on Zora (gasless)
5. **Frame Posting**: Auto-posts a Frame to Farcaster announcing the match
6. **Celebration**: Shows confetti animation and share options

## Customization

### Change Match Window

Edit `lib/kv.ts` - change the 24-hour window in `checkForMatch`:

```typescript
Math.abs(swipe1.timestamp - swipe2.timestamp) < 86400000 // 24 hours
```

### Customize NFT Design

Edit `lib/nft.ts` - modify the `generateSVG` function to change NFT appearance.

### Add Push Notifications

Implement push notifications in `app/api/swipe/route.ts` and `app/api/super-fren/route.ts` using your preferred push service (e.g., Push Protocol, OneSignal).

## Smart Contract (Optional)

A Solidity contract is included in `contracts/FrenFire.sol` for fully onchain storage. To use it:

1. Deploy the contract to Base
2. Set `NEXT_PUBLIC_FRENFIRE_CONTRACT` in your env vars
3. Update `lib/kv.ts` to use `lib/contract.ts` instead

The contract stores swipes and matches onchain, making everything fully decentralized.

## Roadmap

- [x] Onchain contract for swipe storage
- [ ] Push notifications integration (Push Protocol)
- [ ] Enhanced NFT metadata and IPFS storage
- [ ] Frame deep-linking improvements
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Swipe history and matches page

## License

MIT

## Support

For issues and questions, open an issue on GitHub or reach out on Farcaster @yourhandle.

---

Built with 🔥 on Base

