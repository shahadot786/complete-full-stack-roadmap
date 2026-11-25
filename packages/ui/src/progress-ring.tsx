export function ProgressRing({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const circumference = 2 * Math.PI * 15;

  return (
    <span
      className="relative inline-flex size-9 shrink-0 items-center justify-center"
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-line"
        />
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          className="text-accent transition-[stroke-dashoffset] duration-200"
        />
      </svg>
      <span className="absolute font-mono text-xs text-accent-text">
        {clamped}
      </span>
    </span>
  );
}
