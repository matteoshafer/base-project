# Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Vercel KV database created
- [ ] Neynar API key obtained
- [ ] OnchainKit API key obtained
- [ ] Base Paymaster RPC URL configured
- [ ] (Optional) Smart contract deployed to Base
- [ ] (Optional) Zora contract address configured

## Vercel Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: FrenFire app"
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

In Vercel project settings, add all environment variables:

```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=...
NEXT_PUBLIC_BASE_PAYMASTER_RPC=...
NEYNAR_API_KEY=...
NEYNAR_SIGNER_UUID=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 4: Create Vercel KV Database

1. In Vercel dashboard, go to Storage
2. Create a new KV database
3. Copy the `KV_REST_API_URL` and `KV_REST_API_TOKEN`
4. Add them to environment variables

### Step 5: Deploy

Click "Deploy" and wait for the build to complete!

## Post-Deployment

1. Test wallet connection
2. Test swipe functionality
3. Verify matches are being created
4. Check leaderboard is working
5. Test Super Fren feature

## Custom Domain

1. In Vercel project settings, go to Domains
2. Add your custom domain
3. Update `NEXT_PUBLIC_APP_URL` in environment variables
4. Redeploy if needed

## Monitoring

- Check Vercel logs for errors
- Monitor KV database usage
- Track API rate limits (Neynar, OnchainKit)
- Monitor Base Paymaster usage

## Troubleshooting

### Build Errors

- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check TypeScript errors

### Runtime Errors

- Verify all environment variables are set
- Check API keys are valid
- Verify KV database is accessible
- Check Base Paymaster RPC is working

### Wallet Connection Issues

- Verify OnchainKit API key
- Check Base Paymaster configuration
- Ensure wallet provider is configured correctly

