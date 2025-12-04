import { createPublicClient, http, createWalletClient, custom } from "viem";
import { base } from "viem/chains";

// FrenBase Contract ABI (simplified)
const FRENBASE_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "fromFid", type: "uint256" },
      { internalType: "uint256", name: "toFid", type: "uint256" },
      { internalType: "bool", name: "isFren", type: "bool" },
      { internalType: "bool", name: "isSuperFren", type: "bool" },
    ],
    name: "recordSwipe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "fid1", type: "uint256" },
      { internalType: "uint256", name: "fid2", type: "uint256" },
    ],
    name: "getMatch",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "fid1", type: "uint256" },
          { internalType: "uint256", name: "fid2", type: "uint256" },
          { internalType: "uint256", name: "matchNumber", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "string", name: "nftTokenId", type: "string" },
        ],
        internalType: "struct FrenBase.Match",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const FRENBASE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_FRENBASE_CONTRACT ||
  "0x0000000000000000000000000000000000000000";

export async function recordSwipeOnchain(
  fromFid: number,
  toFid: number,
  isFren: boolean,
  isSuperFren: boolean,
  walletClient: any
): Promise<string | null> {
  try {
    const hash = await walletClient.writeContract({
      address: FRENBASE_CONTRACT_ADDRESS as `0x${string}`,
      abi: FRENBASE_ABI,
      functionName: "recordSwipe",
      args: [BigInt(fromFid), BigInt(toFid), isFren, isSuperFren],
    });

    return hash;
  } catch (error) {
    console.error("Error recording swipe onchain:", error);
    return null;
  }
}

export async function getMatchOnchain(
  fid1: number,
  fid2: number
): Promise<any | null> {
  try {
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    const match = await publicClient.readContract({
      address: FRENBASE_CONTRACT_ADDRESS as `0x${string}`,
      abi: FRENBASE_ABI,
      functionName: "getMatch",
      args: [BigInt(fid1), BigInt(fid2)],
    });

    return match;
  } catch (error) {
    console.error("Error getting match onchain:", error);
    return null;
  }
}

