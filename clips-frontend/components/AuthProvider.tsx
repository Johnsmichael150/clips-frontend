"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { User } from "@/app/lib/mockApi";
import { useUserStore, useDashboardStore, useEarningsStore } from "@/app/store";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const setProfile = useUserStore((state) => state.setProfile);
  const clearUser = useUserStore((state) => state.clearUser);
  const { data: session, status } = useSession();

  // Load initial auth state on mount
  useEffect(() => {
    const stored = localStorage.getItem("clipcash_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserState(parsed);
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Basic routing logic based on auth state
  useEffect(() => {
    if (isLoading || status === "loading") return;

    const protectedRoutes = [
      "/dashboard",
      "/onboarding",
      "/earnings",
      "/projects",
      "/vault",
      "/platforms",
      "/clips",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isAuthRoute = pathname === "/login" || pathname === "/signup";

    const authenticated = user || session;

    // 🔐 Not logged in → block protected pages
    if (!authenticated && isProtectedRoute) {
      router.push("/login");
      return;
    }

    // 🔓 Logged in → handle redirection from auth/onboarding pages
    if (authenticated) {
      if (isAuthRoute || pathname === "/") {
        if (user?.onboardingStep === 1 || user?.onboardingStep === 2) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
        return;
      }

      if (
        pathname === "/onboarding" &&
        user?.onboardingStep &&
        user.onboardingStep > 2
      ) {
        router.push("/dashboard");
      }
    }
  }, [user, session, isLoading, status, pathname, router]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("clipcash_user", JSON.stringify(newUser));
      // Sync the authenticated user to useUserStore
      const userProfile = {
        id: newUser.id,
        name: newUser.name || newUser.username || "User",
        email: newUser.email,
        avatarUrl: null,
        plan: "pro" as const,
        planUsagePercent: 80,
      };
      setProfile(userProfile);
      // Kick off background prefetch so data is ready when user lands on dashboard/earnings
      useDashboardStore.getState().fetchDashboard();
      useEarningsStore.getState().fetchEarnings();
    } else {
      localStorage.removeItem("clipcash_user");
      clearUser();
    }
  };

  const logout = () => {
    signOut({ callbackUrl: "/login" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
