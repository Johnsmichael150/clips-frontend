"use client";

import React from "react";
import { DollarSign, Video, Globe } from "lucide-react";
import StatCard from "./StatCard";
import { useDashboardData } from "@/app/hooks/useDashboardData";

export default function StatCardGroup() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-[24px] h-[180px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-[24px] p-8 text-center">
        <p className="text-red-500 font-bold">Failed to load dashboard statistics.</p>
      </div>
    );
  }

  const { stats } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        label="Total Earnings"
        value={stats.earnings.total}
        trend={stats.earnings.trendLabel}
        isPositive={stats.earnings.trend >= 0}
        icon={DollarSign}
      />
      <StatCard
        label="Clips Posted"
        value={stats.clips.total.toString()}
        trend={stats.clips.trendLabel}
        isPositive={stats.clips.trend >= 0}
        icon={Video}
      />
      <StatCard
        label="Active Platforms"
        value={stats.platforms.total.toString()}
        trend={stats.platforms.trendLabel}
        isPositive={stats.platforms.trend >= 0}
        icon={Globe}
      />
    </div>
  );
}
