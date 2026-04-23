"use client";

import React from "react";
import EarningsLayout from "@/components/dashboard/EarningsLayout";
import StatCard from "@/components/dashboard/StatCard";
import { DollarSign, TrendingUp, Wallet, ArrowDownToLine } from "lucide-react";

export default function EarningsPage() {
  return (
    <EarningsLayout>
      <div className="space-y-8">
        {/* Page title */}
        <div>
          <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-white leading-tight">
            Earnings
          </h1>
          <p className="text-[#8e9895] text-[14px] mt-1">
            Track your revenue, payouts, and platform performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Earned"
            value="$12,450"
            trend="+12.5%"
            icon={DollarSign}
          />
          <StatCard
            label="This Month"
            value="$3,210"
            trend="+8.2%"
            icon={TrendingUp}
          />
          <StatCard
            label="Pending Payout"
            value="$940"
            trend="Processing"
            icon={Wallet}
          />
          <StatCard
            label="Withdrawn"
            value="$8,300"
            trend="All time"
            icon={ArrowDownToLine}
          />
        </div>

        {/* Placeholder content area */}
        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-10 flex items-center justify-center min-h-[300px]">
          <p className="text-[#4A5D54] text-[15px]">
            Earnings charts and transaction history coming soon.
          </p>
        </div>
      </div>
    </EarningsLayout>
  );
}
