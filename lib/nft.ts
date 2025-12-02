import { createPublicClient, http, createWalletClient, custom } from "viem";
import { base } from "viem/chains";
import { NFTMetadata } from "@/types";

// Zora Creator Contract (simplified - you'll need the actual contract ABI)
const ZORA_CREATOR_ADDRESS = "0x7A9Ae5d4C2C8C8F8C8C8C8C8C8C8C8C8C8C8C8C8C8"; // Replace with actual

export function generateSVG(
  pfp1: string,
  pfp2: string,
  username1: string,
  username2: string,
  matchNumber: number
): string {
  return `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF4500;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FF6347;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="512" height="512" fill="url(#fireGradient)"/>
      <circle cx="128" cy="256" r="80" fill="white" filter="url(#glow)">
        <image href="${pfp1}" x="48" y="176" width="160" height="160" clip-path="circle(80px at 128px 256px)"/>
      </circle>
      <circle cx="384" cy="256" r="80" fill="white" filter="url(#glow)">
        <image href="${pfp2}" x="304" y="176" width="160" height="160" clip-path="circle(80px at 384px 256px)"/>
      </circle>
      <text x="256" y="400" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="white">
        ${username1} + ${username2}
      </text>
      <text x="256" y="450" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">
        Match #${matchNumber} 🔥
      </text>
    </svg>
  `.trim();
}

export function generateMetadata(
  username1: string,
  username2: string,
  matchNumber: number,
  imageUrl: string
): NFTMetadata {
  return {
    name: `FrenFire Match #${matchNumber}`,
    description: `${username1} and ${username2} became FRENS on FrenFire! 🔥`,
    image: imageUrl,
    attributes: [
      { trait_type: "Match Number", value: matchNumber },
      { trait_type: "Fren 1", value: username1 },
      { trait_type: "Fren 2", value: username2 },
      { trait_type: "Platform", value: "FrenFire" },
    ],
  };
}

// Simplified mint function - you'll need to integrate with Zora's actual contract
export async function mintNFT(
  to: string,
  metadataUri: string,
  walletClient: any
): Promise<string | null> {
  try {
    // This is a placeholder - you'll need to:
    // 1. Upload SVG to IPFS/Arweave
    // 2. Create metadata JSON
    // 3. Upload metadata to IPFS/Arweave
    // 4. Call Zora contract's mint function
    // 5. Use Base Paymaster for gasless transaction

    console.log("Minting NFT to:", to, "with metadata:", metadataUri);
    return "0x123..."; // Return transaction hash
  } catch (error) {
    console.error("Error minting NFT:", error);
    return null;
  }
}

