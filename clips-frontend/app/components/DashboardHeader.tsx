"use client";

import { CloudUpload, CheckSquare, Square } from "lucide-react";
import { useDashboardData } from "@/app/hooks/useDashboardData";
import { useClipSelectionStore } from "@/app/store/clipSelectionStore";

const DUMMY_USER = {
  name: "Alex",
};

export default function DashboardHeader() {
  const userName = DUMMY_USER.name;
  const { data, loading } = useDashboardData();
  const projects = data?.recentProjects || [];
  const { selectAll, isAllSelected, selectedClips } = useClipSelectionStore();

  const handleSelectAll = () => {
    const projectIds = projects.map((project) => String(project.id));
    selectAll(projectIds);
  };

  const allSelected =
    !loading &&
    projects.length > 0 &&
    isAllSelected(projects.map((p) => String(p.id)));
  const hasSelection = selectedClips.size > 0;

  return (
    <header className="flex items-start justify-between gap-4 rounded-2xl px-6 py-5">
      <div>
        <h1 className="text-4xl font-semibold leading-tight text-white">
          Welcome back, {userName}
        </h1>
        <p className="mt-1 text-zinc-400">
          Your AI is currently processing 3 new viral clips from your last
          stream.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {!loading && projects.length > 0 && (
          <button
            onClick={handleSelectAll}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              allSelected
                ? "bg-[#00E68A] text-black shadow-[0_8px_24px_rgba(0,230,138,0.35)]"
                : hasSelection
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {allSelected ? (
              <CheckSquare className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Square className="h-4 w-4" aria-hidden="true" />
            )}
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        )}

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#00E68A] px-5 py-3 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(0,230,138,0.35)] transition hover:brightness-95"
        >
          <CloudUpload className="h-4 w-4" aria-hidden="true" />
          Quick Upload
        </button>
      </div>
    </header>
  );
}
