"use client";

import React from "react";
import { Share2, Wallet } from "lucide-react";
import SocialAccountCard from "./SocialAccountCard";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { TwitchIcon } from "@/components/icons/TwitchIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

type PlatformConfig = {
  platform: "tiktok" | "instagram" | "youtube" | "twitch";
  label: string;
  subtext: string;
  icon: React.ReactNode;
};

type WalletConfig = {
  wallet: string;
  network: string;
  destination: string;
  accentClassName: string;
};

const PLATFORMS: PlatformConfig[] = [
  {
    platform: "tiktok",
    label: "TikTok",
    subtext: "Connect your TikTok account",
    icon: <TikTokIcon className="h-10 w-10" aria-hidden />,
  },
  {
    platform: "instagram",
    label: "Instagram",
    subtext: "Connect your Instagram account",
    icon: <InstagramIcon className="h-10 w-10" aria-hidden />,
  },
  {
    platform: "youtube",
    label: "YouTube",
    subtext: "Connect your YouTube account",
    icon: <YouTubeIcon className="h-10 w-10" aria-hidden />,
  },
  {
    platform: "twitch",
    label: "Twitch",
    subtext: "Connect your Twitch channel",
    icon: <TwitchIcon className="h-10 w-10" aria-hidden />,
  },
];

const WALLETS: WalletConfig[] = [
  {
    wallet: "Primary Wallet",
    network: "Ethereum",
    destination: "Reward payouts and token drops",
    accentClassName: "from-emerald-400/30 via-cyan-400/10 to-transparent",
  },
  {
    wallet: "Backup Wallet",
    network: "Solana",
    destination: "Fallback rewards destination",
    accentClassName: "from-cyan-400/20 via-sky-400/10 to-transparent",
  },
];

interface SocialAccountCardGridProps {
  onConnect: (platform: string) => void;
  selectedPlatforms?: Set<string>;
}

export default function SocialAccountCardGrid({
  onConnect,
  selectedPlatforms = new Set(),
}: SocialAccountCardGridProps) {
  const connectedCount = PLATFORMS.filter(({ platform }) =>
    selectedPlatforms.has(platform)
  ).length;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <Share2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-50">
                Social Platforms
              </h2>
              <p className="text-sm text-zinc-400">
                Connect the channels you want Clips to publish to.
              </p>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            {connectedCount} Connected
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {PLATFORMS.map((config) => (
            <SocialAccountCard
              key={config.platform}
              platform={config.platform}
              label={config.label}
              subtext={config.subtext}
              icon={config.icon}
              onConnect={onConnect}
              isSelected={selectedPlatforms.has(config.platform)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Wallet className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-50">
                Web3 Wallets
              </h2>
              <p className="text-sm text-zinc-400">
                Choose where creator rewards should be delivered.
              </p>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Rewards Destination
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {WALLETS.map((wallet) => (
            <WalletDestinationCard key={wallet.wallet} {...wallet} />
          ))}
        </div>
      </section>
    </div>
  );
}

function WalletDestinationCard({
  wallet,
  network,
  destination,
  accentClassName,
}: WalletConfig) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClassName}`}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-zinc-100">{wallet}</p>
            <p className="text-sm text-zinc-400">{destination}</p>
          </div>
          <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
            {network}
          </div>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/80 text-cyan-300">
          <Wallet className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
