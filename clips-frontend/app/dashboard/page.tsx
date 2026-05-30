"use client";

import React, { useState } from "react";
import Link from "next/link";
import  DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCardGroup from "@/components/dashboard/StatCardGroup";
import RevenueChart from "@/components/dashboard/RevenueChart";
import PlatformDistribution from "@/components/dashboard/PlatformDistribution";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import RecentProjectsSection from "@/components/dashboard/RecentProjectsSection";
import EarningsSummaryCards from "@/components/dashboard/EarningsSummaryCards";
import SendPaymentForm from "@/components/SendPaymentForm";
import WalletInfoCard from "@/components/dashboard/WalletInfoCard";
import WalletHealthCard from "@/components/wallet/WalletHealthCard";
import { useAutoStellarWallet } from "@/app/hooks/useAutoStellarWallet";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { publicKey } = useAutoStellarWallet();

  return (
    <div className="flex min-h-screen bg-background text-white font-sans overflow-hidden">
      {/* Radial Glows */}
      <div className="glow-large fixed top-0 left-0 w-[50vw] h-[50vw] rounded-full bg-brand/5 blur-[120px] pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="fixed top-1/4 right-0 w-[600px] h-[600px] bg-brand/[0.03] rounded-full blur-[100px] pointer-events-none translate-x-1/3" />
      
      {/* Sidebar Backdrop Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto scrollbar-hide relative z-10">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="dashboard-main space-y-8 max-w-[1400px] mx-auto w-full">
          {/* Stats Row */}
          <StatCardGroup />

          {/* Wallet Information Card */}
          <WalletInfoCard />

          {/* Earnings Summary Cards */}
          <div className="space-y-4">
            <h3 className="text-[18px] font-extrabold text-white tracking-tight">Earnings Summary</h3>
            <EarningsSummaryCards />
          </div>

          {/* Middle Section: Chart + Platform Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Revenue Chart — spans 2 cols */}
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>

            {/* Platform Distribution — 1 col */}
            <div>
              <PlatformDistribution />
            </div>
          </div>

          {/* Stellar Payments Hub */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-[18px] font-extrabold text-[#ffffff] tracking-tight">Payments Hub</h3>
              <SendPaymentForm />
            </div>
            
            <div className="space-y-4 flex flex-col">
              <h3 className="text-[18px] font-extrabold text-[#ffffff] tracking-tight">Stellar Wallet Status</h3>
              <WalletHealthCard publicKey={publicKey} />
            </div>
          </div>

          {/* AI Insight */}
          <AIInsightCard />

          {/* Bottom Section: Recent Projects */}
          <RecentProjectsSection />
        </div>
      </main>
    </div>
  );
}
