"use client";

import StatCard from "./Statcard ";
import Image from "next/image";
import { useDashboardData } from "@/app/hooks/useDashboardData";

function EarningsIcon() {
  return (
    <div className="relative w-4.5 h-4.5 shrink-0">
      <Image
        src="/images/Icon2.png"
        alt="Earnings"
        fill
        className="object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

function ClipsIcon() {
  return (
    <div className="relative w-4.5 h-4.5 shrink-0">
      <Image
        src="/images/Icon1.png"
        alt="Clips"
        fill
        className="object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

function PlatformsIcon() {
  return (
    <div className="relative w-4.5 h-4.5 shrink-0">
      <Image
        src="/images/Icon.png"
        alt="Platforms"
        fill
        className="object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

export default function StatCardGroup() {
  const { data, loading } = useDashboardData();

  const stats = data?.stats;

  return (
    <>
       <StatCard
        index={0}
        label="Total Earnings"
        value={stats?.earnings.total || "$0.00"}
        trend={stats?.earnings.trend}
        trendLabel={stats?.earnings.trendLabel}
        icon={<EarningsIcon />}
        iconColor="#00C27C"
        className="bento-stat-card"
        loading={loading}
      />
      <StatCard
        index={1}
        label="Clips Posted"
        value={stats?.clips.total || 0}
        trend={stats?.clips.trend}
        trendLabel={stats?.clips.trendLabel}
        icon={<ClipsIcon />}
        iconColor="#00C27C"
        className="bento-stat-card"
        loading={loading}
      />
      <StatCard
        index={2}
        label="Active Platforms"
        value={stats?.platforms.total || 0}
        trend={stats?.platforms.trend}
        trendLabel={stats?.platforms.trendLabel}
        icon={<PlatformsIcon />}
        iconColor="#00C27C"
        className="bento-stat-card"
        loading={loading}
      />
    </>
  );
}