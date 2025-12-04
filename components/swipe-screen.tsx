"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { FarcasterUser, Cast } from "@/types";
import { UserCard } from "./user-card";
import { ActionButtons } from "./action-buttons";
import { MatchCelebration } from "./match-celebration";
// useUser replaced with useAccount from wagmi

interface SwipeScreenProps {
  demoAddress?: `0x${string}`;
}

export function SwipeScreen({ demoAddress }: SwipeScreenProps) {
  const [currentUser, setCurrentUser] = useState<FarcasterUser | null>(null);
  const [currentCast, setCurrentCast] = useState<Cast | null>(null);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [match, setMatch] = useState<any>(null);
  const [seenUsers, setSeenUsers] = useState<Set<number>>(new Set());
  const { address } = useAccount();
  
  // Use demo address if provided, otherwise use real wallet address
  const activeAddress = demoAddress || address;

  useEffect(() => {
    if (activeAddress) {
      loadNextUser();
    }
  }, [activeAddress]);

  const loadNextUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-user");
      const data = await res.json();
      if (data.user) {
        // Check if we've seen all users (10 mock users)
        if (seenUsers.size >= 10) {
          setCurrentUser(null); // This will trigger the "seen all" message
          setLoading(false);
          return;
        }
        
        // If we've seen this user before, get another one (max 5 retries)
        let attempts = 0;
        let user = data.user;
        while (seenUsers.has(user.fid) && attempts < 5) {
          const retryRes = await fetch("/api/get-user");
          const retryData = await retryRes.json();
          if (retryData.user) {
            user = retryData.user;
          }
          attempts++;
        }
        
        // Mark user as seen
        setSeenUsers(prev => new Set([...prev, user.fid]));
        
        setCurrentUser(user);
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
    console.log("=== SWIPE START ===", { action, hasUser: !!currentUser, hasAddress: !!activeAddress, swiping });
    
    if (!currentUser) {
      console.error("No current user!");
      return;
    }
    
    if (swiping) {
      console.log("Already swiping, ignoring...");
      return;
    }

    console.log("Setting swiping to true and loading next user...");
    setSwiping(true);

    // If action is "fren", randomly check for a match (20% chance)
    if (action === "fren") {
      const isMatch = Math.random() < 0.2; // 20% chance of match
      
      if (isMatch) {
        console.log("🎉 MATCH DETECTED!");
        // Create a match object with user info
        const matchData = {
          fid1: 9999, // Demo user FID
          fid2: currentUser.fid,
          matchNumber: Math.floor(Math.random() * 1000) + 1,
          username1: "You",
          username2: currentUser.username,
          pfp1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23FF6B35'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3E%F0%9F%94%A5%3C/text%3E%3C/svg%3E",
          pfp2: currentUser.pfp_url,
          nftImageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Crect width='512' height='512' fill='url(%23fireGradient)'/%3E%3Cdefs%3E%3ClinearGradient id='fireGradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF4500'/%3E%3Cstop offset='50%25' style='stop-color:%23FF6347'/%3E%3Cstop offset='100%25' style='stop-color:%23FFD700'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='256' y='256' font-family='Arial' font-size='48' fill='white' text-anchor='middle'%3EMatch! 🔥%3C/text%3E%3C/svg%3E",
        };
        
        setMatch(matchData);
        setSwiping(false);
        return; // Don't load next user if there's a match
      }
    }

    // Immediately load next user (don't wait for API in demo mode)
    loadNextUser();
    
    // Reset swiping after a brief delay
    setTimeout(() => {
      setSwiping(false);
    }, 500);

    // Try API call in background (non-blocking, for match detection)
    fetch("/api/swipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toFid: currentUser.fid,
        action,
        address: activeAddress,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Swipe API response:", data);
        if (data.match) {
          console.log("MATCH FOUND!", data.match);
          setMatch(data.match);
        }
      })
      .catch(error => {
        console.error("Swipe API error (non-blocking):", error);
      });
  };

  const handleMatchClose = () => {
    setMatch(null);
    loadNextUser();
    setSwiping(false);
  };

  if (!activeAddress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6">Connect your wallet or try the demo to start finding frens!</p>
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

  if (!currentUser && !loading && seenUsers.size >= 10) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            You've Seen Everyone! 🔥
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            You've swiped through all the people on the app!
          </p>
          <p className="text-gray-600 mb-6">
            Check back later for more frens, or refresh to see them again.
          </p>
          <button
            onClick={() => {
              setSeenUsers(new Set());
              loadNextUser();
            }}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">No more frens to show!</h2>
        <p className="text-gray-600">Check back later for more frens 🔥</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto" style={{ position: 'relative', zIndex: 1 }}>
      <UserCard user={currentUser} cast={currentCast} />
      <div style={{ marginTop: '1rem', position: 'relative', zIndex: 10 }}>
        <ActionButtons
          onFren={() => {
            console.log("onFren callback called");
            handleSwipe("fren");
          }}
          onPass={() => {
            console.log("onPass callback called");
            handleSwipe("pass");
          }}
          disabled={swiping}
          toFid={currentUser.fid}
        />
      </div>
    </div>
  );
}

