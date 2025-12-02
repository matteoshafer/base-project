"use client";

import { SwipeScreen } from "@/components/swipe-screen";
import { WalletButton } from "@coinbase/onchainkit/wallet";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FrenFire 🔥
            </h1>
            <p className="text-sm text-gray-600">Tinder for Frens</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href="/leaderboard"
              className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
            >
              Leaderboard
            </Link>
            <WalletButton />
          </div>
        </div>
        <SwipeScreen />
      </div>
    </main>
  );
}

