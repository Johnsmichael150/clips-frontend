"use client";

import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { useDashboardData } from "@/app/hooks/useDashboardData";

export default function RecentProjectsSection() {
  const { data, loading } = useDashboardData();

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-7 w-48 bg-surface border border-border rounded-lg animate-pulse" />
          <div className="h-5 w-20 bg-surface border border-border rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-[24px] h-[140px] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const projects = data?.recentProjects || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-extrabold text-white tracking-tight">Recent Projects</h3>
        <Link href="/projects" className="text-[14px] font-bold text-brand hover:underline">
          View All
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              clipsCount={project.clipsGenerated}
              status={project.status}
              thumbnail={project.image || "/projects/thumb1.png"}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-[24px] p-12 text-center">
          <p className="text-muted-foreground font-medium">No recent projects found.</p>
          <Link 
            href="/dashboard/upload" 
            className="mt-4 inline-block text-brand font-bold hover:underline"
          >
            Upload your first video
          </Link>
        </div>
      )}
    </div>
  );
}
