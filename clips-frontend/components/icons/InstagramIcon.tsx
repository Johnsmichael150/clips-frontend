interface IconProps {
  className?: string;
  "aria-hidden"?: boolean;
}

export function InstagramIcon({ className, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden={ariaHidden}
    >
      <rect width="24" height="24" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 8.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5z"
        fill="currentColor"
      />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}
