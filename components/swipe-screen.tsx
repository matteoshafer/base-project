"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { FarcasterUser, Cast } from "@/types";
import { UserCard } from "./user-card";
import { ActionButtons } from "./action-buttons";
import { MatchCelebration } from "./match-celebration";
// useUser replaced with useAccount from wagmi

export function SwipeScreen() {
  const [currentUser, setCurrentUser] = useState<FarcasterUser | null>(null);
  const [currentCast, setCurrentCast] = useState<Cast | null>(null);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [match, setMatch] = useState<any>(null);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      loadNextUser();
    }
  }, [address]);

  const loadNextUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-user");
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
        if (data.cast) {
          setCurrentCast(data.cast);
        }
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (action: "fren" | "pass") => {
    if (!currentUser || !address || swiping) return;

    setSwiping(true);

    try {
      const res = await fetch("/api/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toFid: currentUser.fid,
          action,
          address, // Send address to help identify user
        }),
      });

      const data = await res.json();

      if (data.match) {
        setMatch(data.match);
      } else {
        // Load next user after a short delay
        setTimeout(() => {
          loadNextUser();
          setSwiping(false);
        }, 500);
      }
    } catch (error) {
      console.error("Failed to swipe:", error);
      setSwiping(false);
    }
  };

  const handleMatchClose = () => {
    setMatch(null);
    loadNextUser();
    setSwiping(false);
  };

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6">Connect your wallet to start finding frens!</p>
      </div>
    );
  }

  if (match) {
    return <MatchCelebration match={match} onClose={handleMatchClose} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">No more frens to show!</h2>
        <p className="text-gray-600">Check back later for more frens 🔥</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <UserCard user={currentUser} cast={currentCast} />
      <ActionButtons
        onFren={() => handleSwipe("fren")}
        onPass={() => handleSwipe("pass")}
        disabled={swiping}
        toFid={currentUser.fid}
      />
    </div>
  );
}

