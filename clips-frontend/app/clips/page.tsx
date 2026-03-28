"use client";

import { useState, useMemo } from "react";
import ClipsHeader from "../components/ClipsHeader";

interface Clip {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  createdAt: Date;
  engagement: number;
}

// Mock data for demonstration
const mockClips: Clip[] = [
  {
    id: "1",
    title: "Amazing moment #1",
    duration: 15,
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-03-28T10:00:00"),
    engagement: 95,
  },
  {
    id: "2",
    title: "Viral highlight #2",
    duration: 23,
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-03-28T09:30:00"),
    engagement: 87,
  },
  {
    id: "3",
    title: "Epic reaction #3",
    duration: 18,
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-03-28T08:45:00"),
    engagement: 92,
  },
  {
    id: "4",
    title: "Funny moment #4",
    duration: 12,
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-03-28T11:15:00"),
    engagement: 78,
  },
];

export default function ClipsPage() {
  const [sortBy, setSortBy] = useState("newest");

  const sortedClips = useMemo(() => {
    const clips = [...mockClips];

    switch (sortBy) {
      case "newest":
        return clips.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case "oldest":
        return clips.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      case "duration":
        return clips.sort((a, b) => a.duration - b.duration);
      case "engagement":
        return clips.sort((a, b) => b.engagement - a.engagement);
      default:
        return clips;
    }
  }, [sortBy]);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ClipsHeader
        totalClips={mockClips.length}
        sourceFileName="my-stream-recording.mp4"
        onSortChange={handleSortChange}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedClips.map((clip) => (
            <div
              key={clip.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                      ▶️
                    </div>
                    <p className="text-sm">Preview</p>
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                  {clip.duration}s
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-white mb-2 line-clamp-2">
                  {clip.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Engagement: {clip.engagement}%</span>
                  <span>{clip.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}