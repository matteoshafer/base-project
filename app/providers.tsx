"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OnchainKitProvider } from "@coinbase/onchainkit/react";
import { base } from "viem/chains";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ""}
        chain={base}
        config={{
          appearance: {
            mode: "light",
            theme: "minimal",
          },
          paymaster: {
            rpcUrl: process.env.NEXT_PUBLIC_BASE_PAYMASTER_RPC || "",
          },
        }}
      >
        {children}
      </OnchainKitProvider>
    </QueryClientProvider>
  );
}

