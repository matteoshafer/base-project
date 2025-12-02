import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrenFire 🔥 | Tinder for Frens",
  description: "Find your frens on Farcaster. Swipe, match, mint NFTs, and build your degen network.",
  openGraph: {
    title: "FrenFire 🔥 | Tinder for Frens",
    description: "Find your frens on Farcaster. Swipe, match, mint NFTs, and build your degen network.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

