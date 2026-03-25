import StreamIcon from "./icons/StreamIcon";

interface ProgressCardProps {
  percentage: number;
  estimatedTimeRemaining: string;
  isGpuAccelerated?: boolean;
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="5.5" stroke="#94a3b8" strokeWidth="1.2" />
      <path
        d="M7 4.5V7L8.75 8.75"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProgressCard({
  percentage,
  estimatedTimeRemaining,
  isGpuAccelerated = true,
}: ProgressCardProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full pb-8">
      {/* Glassmorphism card with responsive padding */}
      <div className="backdrop-blur-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] flex flex-col gap-4 p-4 sm:p-6 lg:p-8 rounded-2xl w-full">
        {/* Header: label + percentage */}
        <div className="flex items-end justify-between w-full flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <StreamIcon />
            <span className="text-[#e2e8f0] text-[10px] sm:text-[12px] font-semibold tracking-[0.6px] uppercase">
              Processing Stream
            </span>
          </div>
          <span className="text-[#00ff9d] text-xl sm:text-2xl lg:text-[24px] font-black leading-8">
            {clampedPercentage}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] h-4 rounded-full w-full overflow-hidden">
          <div
            className="h-full bg-[#00ff9d] rounded-full shadow-[0px_0px_20px_0px_rgba(0,255,157,0.5)] transition-all duration-500 ease-out"
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>

        {/* Footer: time remaining + GPU status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pt-2 gap-2">
          <div className="flex gap-2 items-center">
            <ClockIcon />
            <span className="text-[#94a3b8] text-xs sm:text-sm">
              Estimated time remaining: {estimatedTimeRemaining}
            </span>
          </div>
          {isGpuAccelerated && (
            <div className="flex gap-1.5 items-center">
              <span className="bg-[#00ff9d] rounded-full size-2 animate-pulse" />
              <span className="text-[#cbd5e1] text-xs sm:text-sm">
                GPU Accelerated
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
