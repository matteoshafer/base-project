"use client";

import { FarcasterUser, Cast } from "@/types";
import { Verified, Users } from "lucide-react";
import Image from "next/image";

interface UserCardProps {
  user: FarcasterUser;
  cast?: Cast | null;
}

export function UserCard({ user, cast }: UserCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
      <div className="relative h-96 bg-gradient-to-b from-orange-100 to-red-100 flex items-center justify-center">
        {user.pfp_url ? (
          <Image
            src={user.pfp_url}
            alt={user.username}
            width={400}
            height={400}
            className="object-cover w-full h-full"
            unoptimized
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23FF6B35'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3E%F0%9F%94%A5%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
            <span className="text-8xl">🔥</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
          <Users className="w-4 h-4" />
          {user.follower_count.toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold">{user.display_name || user.username}</h2>
          {user.verifications.length > 0 && (
            <Verified className="w-5 h-5 text-blue-500" />
          )}
          <span className="text-gray-500">@{user.username}</span>
        </div>

        {user.bio.text && (
          <p className="text-gray-700 mb-4 leading-relaxed">{user.bio.text}</p>
        )}

        {cast && (
          <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-600 mb-1">Latest Cast:</p>
            <p className="text-gray-800">{cast.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

