'use client';

import React, { useState } from 'react';

export type Platform = 'TikTok' | 'Instagram' | 'YT Shorts';

interface PlatformSelectChipsProps {
  selectedPlatforms?: Platform[];
  onChange?: (platforms: Platform[]) => void;
  className?: string;
  error?: string;
}

const PLATFORMS: Platform[] = ['TikTok', 'Instagram', 'YT Shorts'];

export function PlatformSelectChips({
  selectedPlatforms = [],
  onChange,
  className = '',
  error,
}: PlatformSelectChipsProps) {
  const [selected, setSelected] = useState<Platform[]>(selectedPlatforms);

  const togglePlatform = (platform: Platform) => {
    let newSelected: Platform[];
    if (selected.includes(platform)) {
      newSelected = selected.filter((p) => p !== platform);
    } else {
      newSelected = [...selected, platform];
    }
    
    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-wrap gap-3">
        {PLATFORMS.map((platform) => {
          const isSelected = selected.includes(platform);
          return (
            <button
              key={platform}
              type="button"
              onClick={() => togglePlatform(platform)}
              className={`
                relative flex items-center justify-center gap-2 px-5 py-3 rounded-full 
                text-sm font-medium transition-all duration-200 cursor-pointer border min-h-[44px]
                focus:outline-none focus:ring-2 focus:ring-[#17f9bf] focus:ring-offset-2 focus:ring-offset-[#050505]
                ${
                  isSelected
                    ? 'bg-[rgba(23,249,191,0.08)] border-[#17f9bf] text-[#17f9bf] shadow-[0_0_15px_rgba(23,249,191,0.15)]'
                    : 'bg-[#121212] border-[#2a2a2a] text-[#8d97ac] hover:border-[#17f9bf] hover:text-[#f5f7fb]'
                }
              `}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-[#17f9bf]"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {platform}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
