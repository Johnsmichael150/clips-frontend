"use client";

import { useState, useEffect } from "react";

export interface DashboardStats {
  earnings: {
    total: string;
    trend: number;
    trendLabel: string;
  };
  clips: {
    total: number;
    trend: number;
    trendLabel: string;
  };
  platforms: {
    total: number;
    trend: number;
    trendLabel: string;
  };
}

export interface RevenuePoint {
  date: string;
  amount: number;
}

export interface Project {
  id: string;
  title: string;
  clipsGenerated: number;
  status: "processing" | "completed";
  image?: string;
  accent?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueTrend: RevenuePoint[];
  recentProjects: Project[];
}

const MOCK_DATA: DashboardData = {
  stats: {
    earnings: {
      total: "$12,450.80",
      trend: 12.5,
      trendLabel: "+12.5% from last month",
    },
    clips: {
      total: 142,
      trend: 8.2,
      trendLabel: "+8.2% from last month",
    },
    platforms: {
      total: 4,
      trend: 0,
      trendLabel: "Steady performance",
    },
  },
  revenueTrend: [
    { date: "2024-03-01", amount: 400 },
    { date: "2024-03-05", amount: 600 },
    { date: "2024-03-10", amount: 800 },
    { date: "2024-03-15", amount: 700 },
    { date: "2024-03-20", amount: 900 },
    { date: "2024-03-25", amount: 1100 },
  ],
  recentProjects: [
    {
      id: "1",
      title: "Apex Legends Clutch Breakdown and Post Match Analysis",
      clipsGenerated: 2,
      status: "processing",
      accent: "radial-gradient(circle at 30% 25%, rgba(127, 221, 255, 0.55), transparent 32%), linear-gradient(145deg, #0b2230 0%, #112839 45%, #061218 100%)",
    },
    {
      id: "2",
      title: "React Native Tutorial",
      clipsGenerated: 12,
      status: "completed",
      accent: "radial-gradient(circle at 50% 30%, rgba(170, 220, 206, 0.32), transparent 36%), linear-gradient(145deg, #536f66 0%, #62786f 48%, #241c19 100%)",
    },
  ],
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setData(MOCK_DATA);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch dashboard data"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
