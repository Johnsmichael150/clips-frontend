interface ClipResultCardProps {
  title: string;
  description: string;
  duration: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  className?: string;
}

export default function ClipResultCard({
  title,
  description,
  duration,
  thumbnailUrl,
  thumbnailAlt,
  className = "",
}: ClipResultCardProps) {
  return (
    <article
      className={`rounded-2xl p-4 sm:p-5 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="relative h-44 w-full overflow-hidden rounded-xl bg-zinc-900"
        style={{
          backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label={thumbnailAlt || title}
      >
        {!thumbnailUrl && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),rgba(10,10,10,0.95)_58%)]" />
        )}

        <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-1 text-[11px] font-semibold leading-none tracking-wide text-white backdrop-blur-sm">
          {duration}
        </span>
      </div>

      <div className="mt-3 flex min-w-0 flex-col gap-2">
        <h3 className="truncate text-base font-bold leading-tight text-white sm:text-lg">{title}</h3>

        <p
          className="min-w-0 text-sm leading-6 text-zinc-300"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={description}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
