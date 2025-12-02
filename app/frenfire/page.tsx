"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Deep link handler for Farcaster frames
 * Redirects to main app
 */
export default function FrenFireDeepLink() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );
}

