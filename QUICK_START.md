# Quick Start Guide

## Step 1: Restart Your Terminal

After installing Node.js, **close and reopen** your PowerShell/terminal window so it recognizes npm.

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (Next.js, React, OnchainKit, etc.)

## Step 3: Start the Dev Server

```bash
npm run dev
```

## Step 4: Open in Browser

The app will be available at:
**http://localhost:3000**

## What You'll See

1. **Home Page**: The main swipe interface
   - Connect your wallet button
   - Once connected, you'll see random Farcaster users to swipe on

2. **Leaderboard**: Click "Leaderboard" in the top right
   - Shows top fren-makers
   - Displays match statistics

## Note About API Keys

The app will start without API keys, but some features won't work:
- ❌ Wallet connection (needs OnchainKit API key)
- ❌ Fetching users (needs Neynar API key)
- ❌ Storing swipes (needs Vercel KV)

To enable full functionality, create `.env.local` with your API keys (see SETUP.md)

## Troubleshooting

**"npm is not recognized"**
- Restart your terminal/PowerShell
- Verify Node.js is installed: `node --version`

**Port 3000 already in use**
- The app will automatically use the next available port (3001, 3002, etc.)
- Or stop the other process using port 3000

**Build errors**
- Make sure you're in the project root directory
- Try deleting `node_modules` and running `npm install` again

