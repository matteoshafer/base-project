# Base Track Hackathon Submission Template

Copy this template and fill it out for your submission:

---

## Title

**FrenBase 🔥 - Tinder for crypto frens**

---

## Team Members

- **Your Name** - Developer, [Your Affiliation]
  - Role: Full-stack development, smart contracts, Base integration

*Add all team members with names, affiliations, and roles*

---

## Project Description (≤ 250 words)

FrenBase is a gasless, viral social discovery app that brings the Tinder experience to Farcaster. Users swipe through verified Farcaster profiles, match with mutual interests, and automatically mint unique 1/1 NFTs commemorating each connection—all without paying gas fees thanks to Base Paymaster.

Built entirely on Base L2, FrenBase leverages smart wallets and account abstraction to create a frictionless onchain experience. When users match, the app generates beautiful SVG NFTs fusing both profile pictures, posts celebratory frames to Farcaster, and tracks a leaderboard of top "fren-makers." The platform combines Base's low fees and fast finality with Farcaster's social graph to create engaging, viral mechanics that make onchain interactions simple and fun.

**Key Innovation**: First gasless "Tinder for Farcaster" with automatic NFT minting, fully built on Base infrastructure.

---

## Demo Video (≤ 3 minutes)

**Video Link**: [Add your YouTube/Vimeo link here]

**What to show in video:**
1. Wallet connection (gasless)
2. Swipe through users
3. Match celebration with NFT
4. Leaderboard
5. Technical highlights

---

## Functional Demo

**Live Demo**: [Add your Vercel/deployed URL here]

**Local Run**:
```bash
npm install
# Set NEXT_PUBLIC_DEMO_MODE=true in .env.local
npm run dev
```

---

## GitHub Repository Link

**Repository**: [Add your GitHub repository URL here]

**Requirements Met**:
- ✅ Complete public codebase
- ✅ README with table of contents
- ✅ Setup instructions
- ✅ Local run steps
- ✅ Architecture overview

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

## Deployed Contract Address

**Base Mainnet**: `0x...` (Add deployed address)

**Base Sepolia**: `0x...` (Add deployed address)

**Contract**: `contracts/FrenBase.sol`

**Functions**:
- `recordSwipe()` - Store swipe onchain
- `getSwipe()` - Query swipe data
- `getMatch()` - Get match information
- `getMatchCount()` - Get user's match count

---

## Base Integration Highlights

✅ **Base L2**: All transactions on Base  
✅ **Base Paymaster**: Gasless via ERC-4337  
✅ **Smart Wallets**: Coinbase Smart Wallet  
✅ **Wagmi + Viem**: Full EVM compatibility  
✅ **Low Fees**: Enables affordable NFT minting  
✅ **Fast Finality**: Sub-second confirmation  

---

## Additional Notes

- Demo mode available for testing without APIs
- Full TypeScript codebase
- Clean architecture with separation of concerns
- Ready for production deployment

