"use client";

import { useEffect, useState } from "react";
import { WalletButton } from "@coinbase/onchainkit/wallet";
import Link from "next/link";
import { LeaderboardEntry } from "@/types";
import { Trophy, Flame } from "lucide-react";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Leaderboard 🏆
            </h1>
            <p className="text-sm text-gray-600">Top Fren Makers</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
            >
              Home
            </Link>
            <WalletButton />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.fid}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  {index === 0 && <Trophy className="w-8 h-8 text-yellow-500" />}
                  {index === 1 && <Trophy className="w-8 h-8 text-gray-400" />}
                  {index === 2 && <Trophy className="w-8 h-8 text-orange-600" />}
                  {index > 2 && (
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-400">
                      #{index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={entry.pfp || "/default-pfp.png"}
                      alt={entry.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <h3 className="font-bold text-lg">{entry.username}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {entry.matches} matches
                    </span>
                    <span>Match #{entry.rarestMatch || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))}
            {leaderboard.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No matches yet. Be the first to fren someone! 🔥
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

