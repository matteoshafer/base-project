# 🚀 FrenBase Hackathon Demo Guide

## Quick Start for Demo

### Option 1: Full Setup (Recommended for Best Demo)

1. **Get API Keys** (5-10 minutes):
   - **Neynar API**: Sign up at [neynar.com](https://neynar.com) → Get API key
   - **Vercel KV**: Create free KV database at [vercel.com](https://vercel.com) → Storage → KV
   - **OnchainKit**: Optional - Get from [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/)

2. **Create `.env.local` file**:
   ```env
   # Required
   NEYNAR_API_KEY=your_key_here
   KV_REST_API_URL=your_kv_url
   KV_REST_API_TOKEN=your_kv_token
   
   # Optional but recommended
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key_here
   NEXT_PUBLIC_BASE_PAYMASTER_RPC=https://paymaster.base.org
   
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the app**:
   ```bash
   npm install
   npm run dev
   ```

### Option 2: Demo Mode (No API Keys Needed!)

If you don't have time to set up APIs, use demo mode:

1. **Create `.env.local`**:
   ```env
   NEXT_PUBLIC_DEMO_MODE=true
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

2. **Run the app**:
   ```bash
   npm install
   npm run dev
   ```

**Note**: Demo mode uses mock data and won't save matches to KV, but it's perfect for showing the UI and flow!

---

## 🎯 Demo Flow (What to Show)

### 1. **Wallet Connection** (30 seconds)
- Click "Connect Wallet"
- Show Coinbase Wallet or MetaMask connection
- Highlight gasless experience (Base Paymaster)

### 2. **Swipe Interface** (1-2 minutes)
- Show beautiful Tinder-like UI
- Swipe through Farcaster users
- Show user profiles with PFPs, bios, and recent casts
- Demonstrate FREN and PASS buttons

### 3. **Match Celebration** (30 seconds)
- When a match happens, show:
  - Confetti animation 🎉
  - Match number display
  - Generated NFT preview
  - Share functionality

### 4. **Leaderboard** (30 seconds)
- Navigate to leaderboard
- Show top fren-makers
- Highlight match statistics

### 5. **Super Fren Feature** (30 seconds)
- Show premium Super Fren button
- Explain guaranteed notifications
- (If contract deployed) Show transaction flow

---

## 🎤 Demo Talking Points

### Opening (30 seconds)
> "FrenBase is Tinder for crypto frens - a gasless, viral mini-app that lets you swipe on frens, match, and mint NFTs. Built entirely on Base with Farcaster integration."

### Key Features to Highlight

1. **Gasless Everything**
   - "Powered by Base Paymaster - users never pay gas"
   - "Coinbase Smart Wallet integration for seamless onboarding"

2. **Farcaster Integration**
   - "Real Farcaster users with verified accounts"
   - "Auto-posts frames to Farcaster on matches"
   - "Uses Neynar API for user discovery"

3. **NFT Minting**
   - "Every match generates a unique 1/1 SVG NFT"
   - "Fuses both users' profile pictures"
   - "Minted on Zora (gasless)"

4. **Viral Mechanics**
   - "Leaderboard for top fren-makers"
   - "Match numbers create rarity"
   - "Super Fren premium feature"

5. **Tech Stack**
   - "Next.js 14 App Router"
   - "Wagmi + Viem for wallet interactions"
   - "Vercel KV for fast storage"
   - "TypeScript + Tailwind CSS"

---

## 🐛 Common Issues & Fixes

### Issue: "Failed to fetch user"
**Fix**: 
- Check `NEYNAR_API_KEY` is set
- Or enable demo mode: `NEXT_PUBLIC_DEMO_MODE=true`

### Issue: "Missing user ID" error
**Fix**: 
- In demo mode, this shouldn't happen
- Make sure wallet is connected
- Check browser console for errors

### Issue: Wallet won't connect
**Fix**:
- Make sure you're on Base network
- Try refreshing the page
- Check if `NEXT_PUBLIC_BASE_PAYMASTER_RPC` is set

### Issue: Matches not saving
**Fix**:
- Check `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
- In demo mode, matches are simulated (not saved)

---

## 🎨 Demo Enhancements

### Before the Demo

1. **Pre-populate some matches** (if using real APIs):
   - Create a few test swipes to show leaderboard data
   - Set up a few matches to show match celebration

2. **Prepare screenshots**:
   - Take screenshots of match celebrations
   - Prepare leaderboard with data
   - Have NFT examples ready

3. **Test on mobile**:
   - The app is responsive
   - Show mobile view if possible

### During the Demo

1. **Use two browsers** (if possible):
   - Show matching in real-time
   - Demonstrate both sides of a match

2. **Show the code** (if judges ask):
   - Clean TypeScript code
   - Well-structured API routes
   - Reusable components

3. **Highlight innovation**:
   - Gasless UX
   - Farcaster + Base integration
   - Viral mechanics

---

## 📊 What Judges Will Look For

✅ **Functionality**: Does it work?
- Wallet connection ✅
- Swipe interface ✅
- Match detection ✅
- NFT generation ✅

✅ **Innovation**: What's unique?
- Gasless everything
- Farcaster integration
- Viral mechanics
- NFT minting on match

✅ **Polish**: How complete is it?
- Beautiful UI
- Smooth animations
- Error handling
- Loading states

✅ **Technical**: Code quality?
- TypeScript
- Clean architecture
- API integration
- Error handling

---

## 🚀 Deployment for Demo

### Quick Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "FrenBase hackathon demo"
   git remote add origin <your-repo>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repo
   - Add environment variables
   - Deploy!

3. **Update App URL**:
   - Set `NEXT_PUBLIC_APP_URL` to your Vercel URL
   - Redeploy

---

## 💡 Pro Tips

1. **Have a backup plan**:
   - Demo mode works without APIs
   - Have screenshots ready
   - Prepare a video walkthrough

2. **Practice the flow**:
   - Know what to click
   - Have test accounts ready
   - Practice timing

3. **Tell a story**:
   - "Imagine you're on Farcaster..."
   - "You see someone interesting..."
   - "You swipe FREN..."
   - "It's a match! 🔥"

4. **Show the future**:
   - "Next steps: Push notifications"
   - "Onchain contract for matches"
   - "Mobile app"
   - "Enhanced NFT metadata"

---

## 🎯 Success Metrics to Mention

- **User Experience**: Gasless = frictionless
- **Viral Potential**: Leaderboard + match numbers
- **Technical**: Full-stack on Base
- **Innovation**: First Tinder-for-Farcaster app
- **Scalability**: Vercel KV can handle millions

---

## 📝 Final Checklist

Before demo:
- [ ] App runs locally
- [ ] Wallet connects
- [ ] Can swipe users
- [ ] Matches work (or demo mode enabled)
- [ ] Leaderboard shows data
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Environment variables set
- [ ] Backup demo mode ready

Good luck! 🔥

