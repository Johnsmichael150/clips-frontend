"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ClipsHeaderProps {
  totalClips: number;
  sourceFileName: string;
  onSortChange: (sortBy: string) => void;
}

export default function ClipsHeader({
  totalClips,
  sourceFileName,
  onSortChange
}: ClipsHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("newest");

  const handleSortChange = (sortBy: string) => {
    setSelectedSort(sortBy);
    onSortChange(sortBy);
    setIsDropdownOpen(false);
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "duration", label: "Shortest First" },
    { value: "engagement", label: "Most Engaging" },
  ];

  return (
    <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Count and source info */}
          <div>
            <h1 className="text-2xl font-bold text-white">
              AI found {totalClips} clips
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Automatically curated from {sourceFileName}
            </p>
          </div>

          {/* Right side - Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <span className="text-sm font-medium">
                {sortOptions.find(option => option.value === selectedSort)?.label}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-lg z-20">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                      selectedSort === option.value
                        ? "text-[#00FF9D] bg-white/5"
                        : "text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}