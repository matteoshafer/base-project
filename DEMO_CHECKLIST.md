# ✅ Hackathon Demo Checklist

## 🎯 Critical Items (Must Have)

### 1. Environment Setup
- [ ] Create `.env.local` file in root directory
- [ ] Set `NEXT_PUBLIC_DEMO_MODE=true` for quick demo (no APIs needed)
- [ ] OR set up real APIs:
  - [ ] `NEYNAR_API_KEY` (get from neynar.com)
  - [ ] `KV_REST_API_URL` and `KV_REST_API_TOKEN` (from Vercel)
  - [ ] `NEXT_PUBLIC_APP_URL` (your deployment URL)

### 2. Test Core Functionality
- [ ] Wallet connects (Coinbase Wallet or MetaMask)
- [ ] Can see user cards with PFPs and bios
- [ ] FREN and PASS buttons work
- [ ] Match celebration shows when match occurs
- [ ] Leaderboard displays (even if empty)
- [ ] No console errors

### 3. Demo Flow Practice
- [ ] Practice 2-minute demo walkthrough
- [ ] Know what to click and when
- [ ] Have backup plan if APIs fail (demo mode)

## 🚀 Nice to Have (Enhancements)

### 4. Pre-populate Data (if using real APIs)
- [ ] Create a few test swipes
- [ ] Set up a match to show celebration
- [ ] Add leaderboard entries

### 5. Deployment
- [ ] Deploy to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Test deployed version
- [ ] Update `NEXT_PUBLIC_APP_URL`

### 6. Polish
- [ ] Test on mobile device
- [ ] Take screenshots for backup
- [ ] Prepare talking points
- [ ] Have video walkthrough ready

## 📋 Quick Start Commands

```bash
# Install dependencies
npm install

# Create .env.local with demo mode
echo "NEXT_PUBLIC_DEMO_MODE=true" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local

# Run dev server
npm run dev
```

## 🎤 Demo Script (2 minutes)

1. **Opening (10s)**: "FrenBase is Tinder for crypto frens - gasless, viral, built on Base"

2. **Wallet Connection (15s)**: Show wallet connect, highlight gasless

3. **Swipe Interface (30s)**: Show user cards, swipe through, demonstrate FREN/PASS

4. **Match Celebration (20s)**: Show match animation, NFT preview, confetti

5. **Leaderboard (15s)**: Show top fren-makers

6. **Tech Highlights (30s)**: 
   - Gasless (Base Paymaster)
   - Farcaster integration (Neynar)
   - NFT minting (Zora)
   - Viral mechanics

## 🐛 Troubleshooting

**Issue**: Can't fetch users
- **Fix**: Enable demo mode or check NEYNAR_API_KEY

**Issue**: Matches not saving
- **Fix**: Check KV credentials or use demo mode

**Issue**: Wallet won't connect
- **Fix**: Make sure you're on Base network, refresh page

## ✅ Final Check

Before demo:
- [ ] App runs without errors
- [ ] Can complete full swipe flow
- [ ] Match celebration works
- [ ] Demo mode tested as backup
- [ ] Mobile responsive
- [ ] Ready to present!

Good luck! 🔥

