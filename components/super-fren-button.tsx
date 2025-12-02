"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { TransactionButton } from "@coinbase/onchainkit/react";
import { parseEther } from "viem";
import { Sparkles } from "lucide-react";

interface SuperFrenButtonProps {
  toFid: number;
  onSuccess: () => void;
}

export function SuperFrenButton({ toFid, onSuccess }: SuperFrenButtonProps) {
  const { address } = useAccount();
  const [processing, setProcessing] = useState(false);

  const handleSuperFren = async () => {
    if (!address) return;

    setProcessing(true);
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
      console.error("Super Fren failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <TransactionButton
      mode="pay"
      transactions={[
        {
          to: process.env.NEXT_PUBLIC_SUPER_FREN_CONTRACT || "0x0000000000000000000000000000000000000000",
          value: parseEther("0.001"),
        },
      ]}
      onSuccess={handleSuperFren}
      disabled={processing}
      className="w-full h-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-xl transition-all shadow-lg hover:shadow-xl animate-super-fren"
    >
      <Sparkles className="w-8 h-8" />
      SUPER FREN
    </TransactionButton>
  );
}

