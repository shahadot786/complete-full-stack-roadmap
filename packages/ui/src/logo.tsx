export function Logo({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="size-8 shrink-0 text-accent"
        fill="none"
      >
        <path
          d="M3 25 L12 8 L20 25 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 25 L21 13 L29 25 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-2xl tracking-tight text-ink">
        {label}
      </span>
    </span>
  );
}
