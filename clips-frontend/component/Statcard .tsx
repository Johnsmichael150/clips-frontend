"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StatCardProps {
    /** Top label e.g. "Total Earnings" */
    label: string;
    /** Primary large value e.g. "$4,231.89" or "128" */
    value: string | number;
    /**
     * Trend percentage string or number.
     * Positive → green, Negative → red, Zero / undefined → neutral.
     * e.g. 12.5  → renders "+12.5%"
     *      -3.2  → renders "−3.2%"
     */
    trend?: number;
    /** Optional sub-label for the trend, e.g. "vs last month" */
    trendLabel?: string;
    /** Icon rendered inside the glowing badge (top-right). Pass an SVG element. */
    icon: React.ReactNode;
    /**
     * Accent hue for the icon glow. Defaults to the brand green.
     * Accepts any CSS color string.
     */
    iconColor?: string;
    /** Extra Tailwind classes on the outer wrapper */
    className?: string;
    /** Stagger index for the entrance animation (0, 1, 2 …) */
    index?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTrend(trend: number): string {
    if (trend === 0) return "0%";
    const sign = trend > 0 ? "+" : "−"; // use proper minus sign
    return `${sign}${Math.abs(trend).toFixed(1)}%`;
}

/** Animated counter that counts up from 0 to the numeric part of `value`. */
function useCountUp(target: string | number, duration = 900): string {
    const [display, setDisplay] = useState("0");
    const rafRef = useRef<number>(0);

    useEffect(() => {
        // Extract leading numeric portion, keep suffix (e.g. "$4,231.89" → prefix "$", num 4231.89)
        const str = String(target);
        const match = str.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
        if (!match) {
            setDisplay(str);
            return;
        }
        const [, prefix, rawNum, suffix] = match;
        const numericTarget = parseFloat(rawNum.replace(/,/g, ""));
        if (isNaN(numericTarget)) {
            setDisplay(str);
            return;
        }

        const decimals = (rawNum.split(".")[1] ?? "").length;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericTarget * eased;
            const formatted = current.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            });
            setDisplay(`${prefix}${formatted}${suffix}`);
            if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [target, duration]);

    return display;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatCard({
    label,
    value,
    trend,
    trendLabel = "vs last month",
    icon,
    iconColor = "#00C27C",
    className = "",
    index = 0,
}: StatCardProps) {
    const animatedValue = useCountUp(value);

    const hasTrend = trend !== undefined;
    const isPositive = (trend ?? 0) > 0;
    const isNegative = (trend ?? 0) < 0;
    const isNeutral = (trend ?? 0) === 0;

    const trendColor = isPositive
        ? "text-[#00C27C]"
        : isNegative
            ? "text-red-400"
            : "text-white/40";



    // Inline style for the icon glow — derived from iconColor
    const glowStyle: React.CSSProperties = {
        backgroundColor: `#FFFFFF0D`,
        color: iconColor,
    };

    return (
        <div
            className={[
                // Card shell with responsive padding
                "relative flex flex-col justify-between",
                "rounded-2xl border border-white/[0.07] bg-[#141414B2] backdrop-blur-xl",
                "px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 overflow-hidden",
                "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-white/10 before:to-transparent",
                "animate-stat-in",
                className,
            ].join(" ")}
            style={
                {
                    "--stagger": index,
                    animationDelay: `${index * 80}ms`,
                } as React.CSSProperties
            }
        >
            {/* ── Top row: label + icon ─────────────────────────────── */}
            <div className="flex items-center justify-between gap-3 mb-4">
                <p className="text-xs sm:text-sm lg:text-[16px] font-medium text-[#94A3B8] leading-tight tracking-wide uppercase">
                    {label}
                </p>

                {/* Icon badge with green glow */}
                <span
                    className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                    style={glowStyle}
                    aria-hidden="true"
                >
                    {icon}
                </span>
            </div>

            <div className="flex gap-4">
                <p
                    className="text-2xl sm:text-3xl lg:text-[28px] font-bold text-white leading-none tracking-tight tabular-nums mb-3"
                    aria-label={`${label}: ${value}`}
                >
                    {animatedValue}
                </p>

                {/* ── Trend badge ──────────────────────────────────────────── */}
                {hasTrend ? (
                    <div className="flex items-center gap-2">
                        <span
                            className={[
                                "inline-flex items-center text-[12px] gap-1 font-semibold px-2 py-0.5 rounded-full",
                                trendColor,
                            ].join(" ")}
                        >
                            {/* Arrow icon */}
                            {isPositive && (
                                <TrendingUp size={14} />

                            )}
                            {isNegative && (
                                <TrendingDown className="text-red-500" size={14} />
                            )}
                            {isNeutral ? "" : formatTrend(trend!)}
                        </span>
                        <span className="text-[13px] text-white/30">{trendLabel}</span>
                    </div>
                ) : (
                    /* Placeholder so height stays consistent when no trend */
                    <div className="h-5.5" aria-hidden="true" />
                )}
            </div>
        </div>
    );
}