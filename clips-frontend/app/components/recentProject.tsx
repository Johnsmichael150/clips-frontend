import Image from "next/image";
import ApexImage from "@/app/assets/Container (1).svg";
import ReactImage from "@/app/assets/Container.svg";
import { useDashboardData } from "@/app/hooks/useDashboardData";
import { useClipSelectionStore } from "@/app/store/clipSelectionStore";
import { Skeleton } from "./Skeleton";
import ClipActionToolbar from "./ClipActionToolbar";

export interface RecentProject {
  id: string | number;
  image?: any;
  title: string;
  clipsGenerated: number;
  status: "processing" | "completed";
  accent: string;
}

function ProjectSkeleton() {
  return (
    <div className="flex min-h-[140px] items-center gap-4 rounded-2xl border border-white/6 bg-[var(--card-background)] p-4">
      <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </div>
  );
}

export default function RecentProjects() {
  const { data, loading } = useDashboardData();
  const projects = data?.recentProjects || [];
  const { toggleClip, selectAll, isSelected, isAllSelected } =
    useClipSelectionStore();

  const handleSelectAll = () => {
    const projectIds = projects.map((project) => String(project.id));
    selectAll(projectIds);
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="md:text-[20px] font-black tracking-[-0.04em] text-[#F1F5F9] text-[18px]">
            Recent Projects
          </h1>
        </div>
        {!loading && projects.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleSelectAll}
              className="text-[14px] font-bold text-[#00FF9D] transition-all duration-200 hover:text-[var(--link-hover)] hover:underline hover:underline-offset-4"
            >
              {isAllSelected(projects.map((p) => String(p.id)))
                ? "Deselect All"
                : "Select All"}
            </button>
            <a
              href="#"
              className="text-[14px] font-bold text-[#00FF9D] transition-all duration-200 hover:text-[var(--link-hover)] hover:underline hover:underline-offset-4"
            >
              View All
            </a>
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {loading ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : projects.length === 0 ? (
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-12 px-4 rounded-2xl border border-dashed border-white/10 bg-white/5 text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              No projects yet
            </h3>
            <p className="text-zinc-400 mt-1 max-w-xs mx-auto">
              Start by creating your first project and transform your content
              with AI.
            </p>
            <button className="mt-6 px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors">
              Create New Project
            </button>
          </div>
        ) : (
          projects.map((project) => {
            const projectId = String(project.id);
            const selected = isSelected(projectId);

            return (
              <article
                key={project.id}
                className={`group relative flex min-h-[140px] items-center gap-4 rounded-2xl border bg-[var(--card-background)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 ${
                  selected
                    ? "border-[#00E68A] ring-2 ring-[#00E68A]/30"
                    : "border-white/6"
                }`}
              >
                {/* Checkbox - visible on hover or when selected */}
                <div
                  className={`absolute top-3 left-3 z-10 transition-opacity duration-200 ${
                    selected
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleClip(projectId);
                    }}
                    className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                      selected
                        ? "border-[#00E68A] bg-[#00E68A]"
                        : "border-white/40 bg-white/10 hover:border-white/60"
                    }`}
                    aria-label={selected ? "Deselect clip" : "Select clip"}
                  >
                    {selected && (
                      <svg
                        className="h-4 w-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <div
                  aria-hidden="true"
                  className="relative h-24 w-24 shrink-0 rounded-xl border border-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  style={{ background: project.accent }}
                >
                  {project.image && (
                    <Image
                      src={
                        project.image === "ApexImage"
                          ? ApexImage
                          : project.image === "ReactImage"
                            ? ReactImage
                            : project.image
                      }
                      alt={project.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-bold tracking-[-0.03em] text-white">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-[12px] font-medium text-[var(--muted-text)]">
                      {project.clipsGenerated} clips generated
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center rounded-md px-3 py-1 text-xs font-extrabold tracking-[0.02em] ${
                      project.status === "processing"
                        ? "status-processing"
                        : "status-completed"
                    }`}
                  >
                    {project.status === "processing"
                      ? "PROCESSING"
                      : "COMPLETED"}
                  </span>

                  {/* Clip Action Toolbar (#83) */}
                  <ClipActionToolbar
                    onEdit={() => console.log("Edit clip:", project.id)}
                    onDownload={() => console.log("Download clip:", project.id)}
                    onPreview={() => console.log("Preview clip:", project.id)}
                  />
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
