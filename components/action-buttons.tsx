"use client";

import { useState } from "react";
import { Flame, X } from "lucide-react";
import { SuperFrenButton } from "./super-fren-button";

interface ActionButtonsProps {
  onFren: () => void;
  onPass: () => void;
  disabled?: boolean;
  toFid: number;
}

export function ActionButtons({ onFren, onPass, disabled, toFid }: ActionButtonsProps) {
  const [showSuperFren, setShowSuperFren] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          onClick={onPass}
          disabled={disabled}
          className="flex-1 h-20 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <X className="w-10 h-10 text-gray-600" />
        </button>

        <button
          onClick={onFren}
          disabled={disabled}
          className="flex-1 h-20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl animate-fren-glow"
        >
          <Flame className="w-8 h-8" />
          FREN
        </button>
      </div>

      {toFid && (
        <button
          onClick={() => setShowSuperFren(!showSuperFren)}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Super Fren (0.001 ETH) ✨
        </button>
      )}

      {showSuperFren && toFid && (
        <SuperFrenButton toFid={toFid} onSuccess={onFren} />
      )}
    </div>
  );
}

