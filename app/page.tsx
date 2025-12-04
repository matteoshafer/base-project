"use client";

import { SwipeScreen } from "@/components/swipe-screen";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";
import { useState } from "react";
import { isDemoMode, getMockWalletAddress } from "@/lib/demo";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [demoMode, setDemoMode] = useState(false);
  const [demoAddress, setDemoAddress] = useState<`0x${string}` | null>(null);

  const handleTryDemo = () => {
    const mockAddr = getMockWalletAddress();
    setDemoAddress(mockAddr);
    setDemoMode(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FrenBase 🔥
            </h1>
            <p className="text-sm text-gray-600">Tinder for crypto frens</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href="/leaderboard"
              className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
            >
              Leaderboard
            </Link>
            {demoMode ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 bg-yellow-100 px-3 py-1 rounded-full">
                  🎮 Demo Mode: {demoAddress?.slice(0, 6)}...{demoAddress?.slice(-4)}
                </span>
                <button
                  onClick={() => {
                    setDemoMode(false);
                    setDemoAddress(null);
                  }}
                  className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
                >
                  Exit Demo
                </button>
              </div>
            ) : isConnected ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleTryDemo}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
                >
                  🎮 Try Demo
                </button>
                <button
                  onClick={() => connect({ connector: connectors[0] })}
                  className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
        <SwipeScreen demoAddress={demoMode ? demoAddress : undefined} />
      </div>
    </main>
  );
}

