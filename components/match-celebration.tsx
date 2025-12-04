"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Flame, Share2 } from "lucide-react";
import Image from "next/image";

interface MatchCelebrationProps {
  match: {
    fid1: number;
    fid2: number;
    username1: string;
    username2: string;
    pfp1: string;
    pfp2: string;
    matchNumber: number;
    nftImageUrl?: string;
  };
  onClose: () => void;
}

export function MatchCelebration({ match, onClose }: MatchCelebrationProps) {
  const [shareText, setShareText] = useState("");

  useEffect(() => {
    // Confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    setShareText(`I just frenned @${match.username2} #${match.matchNumber} — fren me back? 🔥`);

    return () => clearInterval(interval);
  }, [match]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FrenBase Match! 🔥",
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in">
        <div className="mb-6">
          <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            IT'S A MATCH! 🔥
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            Match #{match.matchNumber}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-2 border-4 border-orange-500">
              <Image
                src={match.pfp1 || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='40' fill='%23999' text-anchor='middle' dy='.3em'%3E👤%3C/text%3E%3C/svg%3E"}
                alt={match.username1}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="font-bold">@{match.username1}</p>
          </div>

          <Flame className="w-12 h-12 text-orange-500" />

          <div className="text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-2 border-4 border-orange-500">
              <Image
                src={match.pfp2 || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='40' fill='%23999' text-anchor='middle' dy='.3em'%3E👤%3C/text%3E%3C/svg%3E"}
                alt={match.username2}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="font-bold">@{match.username2}</p>
          </div>
        </div>

        {match.nftImageUrl && (
          <div className="mb-6">
            <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border-4 border-orange-500">
              <Image
                src={match.nftImageUrl}
                alt="Match NFT"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Your NFT has been minted! 🎨</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

