# Quick Setup Guide - Where to Put API Keys

## Step 1: Create Environment File

Create a file named `.env.local` in the **root directory** of your project (same level as `package.json`).

```bash
# In your project root
touch .env.local
```

Or create it manually in your code editor.

## Step 2: Add Your API Keys

Copy and paste this template into `.env.local` and fill in your actual API keys:

```env
# OnchainKit - Get from https://portal.cdp.coinbase.com/
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here

# Base Paymaster - Use public Base Paymaster or your own
NEXT_PUBLIC_BASE_PAYMASTER_RPC=https://paymaster.base.org

# Neynar API - Get from https://neynar.com
NEYNAR_API_KEY=your_neynar_api_key_here
NEYNAR_SIGNER_UUID=your_neynar_signer_uuid_here

# Vercel KV - Get from Vercel Dashboard > Storage > KV
KV_REST_API_URL=your_vercel_kv_url_here
KV_REST_API_TOKEN=your_vercel_kv_token_here

# Optional: Super Fren Contract (if you deploy one)
NEXT_PUBLIC_SUPER_FREN_CONTRACT=0x...

# Optional: FrenBase Onchain Contract (if you deploy one)
NEXT_PUBLIC_FRENBASE_CONTRACT=0x...

# App URL - Update after deployment
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Get Your API Keys

### OnchainKit API Key
1. Go to https://portal.cdp.coinbase.com/
2. Sign up / Log in
3. Create a new app
4. Copy your API key

### Neynar API Key
1. Go to https://neynar.com
2. Sign up / Log in
3. Go to API Keys section
4. Create a new API key
5. For Signer UUID: Create a signer in the Neynar dashboard for posting frames

### Vercel KV
1. Go to https://vercel.com
2. Create a new project or use existing
3. Go to Storage tab
4. Create a new KV database
5. Copy the `KV_REST_API_URL` and `KV_REST_API_TOKEN`

### Base Paymaster
- For development: Use `https://paymaster.base.org`
- For production: Set up your own paymaster or use Base's public one

## Step 4: Verify Your File

Your `.env.local` file should look like this (with real keys):

```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=abc123...
NEYNAR_API_KEY=xyz789...
...
```

**Important:**
- ✅ `.env.local` is already in `.gitignore` (won't be committed to git)
- ✅ Never share your API keys publicly
- ✅ Restart your dev server after adding keys: `npm run dev`

## Step 5: Test

After adding your keys, restart the dev server:

```bash
npm run dev
```

The app should now connect to all services!

## Troubleshooting

**"Missing API key" errors:**
- Make sure `.env.local` is in the root directory (not in `app/` or `components/`)
- Restart your dev server after adding keys
- Check for typos in variable names (they must match exactly)

**"Cannot connect to wallet":**
- Verify `NEXT_PUBLIC_ONCHAINKIT_API_KEY` is set correctly
- Check `NEXT_PUBLIC_BASE_PAYMASTER_RPC` is a valid URL

**"Failed to fetch users":**
- Verify `NEYNAR_API_KEY` is correct
- Check your Neynar API quota/limits

