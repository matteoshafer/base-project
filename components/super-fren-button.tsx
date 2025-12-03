"use client";

import { useState, useEffect } from "react";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { Sparkles } from "lucide-react";

interface SuperFrenButtonProps {
  toFid: number;
  onSuccess: () => void;
}

export function SuperFrenButton({ toFid, onSuccess }: SuperFrenButtonProps) {
  const { address } = useAccount();
  const [processing, setProcessing] = useState(false);
  
  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle success after transaction is confirmed
  useEffect(() => {
    if (isConfirmed && hash) {
      const callAPI = async () => {
        try {
          const res = await fetch("/api/super-fren", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              toFid,
            }),
          });

          if (res.ok) {
            onSuccess();
          }
        } catch (error) {
          console.error("Super Fren API call failed:", error);
        } finally {
          setProcessing(false);
        }
      };
      callAPI();
    }
  }, [isConfirmed, hash, toFid, onSuccess]);

  const handleSuperFren = async () => {
    if (!address) return;

    setProcessing(true);
    try {
      sendTransaction({
        to: (process.env.NEXT_PUBLIC_SUPER_FREN_CONTRACT as `0x${string}`) || "0x0000000000000000000000000000000000000000",
        value: parseEther("0.001"),
      });
    } catch (error) {
      console.error("Super Fren failed:", error);
      setProcessing(false);
    }
  };

  const isLoading = isPending || isConfirming || processing;

  return (
    <button
      onClick={handleSuperFren}
      disabled={isLoading || !address}
      className="w-full h-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-xl transition-all shadow-lg hover:shadow-xl animate-super-fren disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Sparkles className="w-8 h-8" />
      {isLoading ? "PROCESSING..." : "SUPER FREN"}
    </button>
  );
}

