"use client";

/**
 * Revenue Trend Card Component
 * Displays revenue trends over time
 * Spans 2/3 width in the Bento grid layout
 */

import { useDashboardData } from "@/app/hooks/useDashboardData";
import { Skeleton } from "./Skeleton";

export default function RevenueTrendCard() {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="bento-revenue-trend bento-card bento-card-tall">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-8 w-24 ml-auto" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </div>
        <Skeleton className="flex-1 w-full rounded-lg" />
      </div>
    );
  }

  const revenue = data?.stats.earnings;

  return (
    <div className="bento-revenue-trend bento-card bento-card-tall">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
          <p className="text-sm text-zinc-400 mt-1">Last 30 days performance</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{revenue?.total || "$0.00"}</p>
          <p className="text-sm text-[#00C27C] flex items-center justify-end gap-1 mt-1">
            <span>{revenue?.trend && revenue.trend > 0 ? "↑" : "↓"}</span>
            <span>{revenue?.trend ? `+${revenue.trend}%` : "0%"}</span>
          </p>
        </div>
      </div>
      
      {/* Chart Placeholder */}
      <div className="flex-1 flex items-center justify-center border border-dashed border-zinc-700 rounded-lg">
        <div className="text-center text-zinc-500">
          <svg 
            className="w-16 h-16 mx-auto mb-2 opacity-50" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" 
            />
          </svg>
          <p className="text-sm">Revenue chart visualization</p>
          <p className="text-xs mt-1 opacity-60">Integrate your preferred charting library</p>
        </div>
      </div>
    </div>
  );
}
