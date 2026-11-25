export function Contour({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 size-full text-ink ${className}`}
      opacity="0.03"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M-40 300 C 160 230, 260 340, 460 250 S 760 150, 940 230 S 1120 300, 1260 180" />
        <path d="M-40 270 C 160 200, 260 310, 460 220 S 760 120, 940 200 S 1120 270, 1260 150" />
        <path d="M-40 240 C 160 170, 260 280, 460 190 S 760 90, 940 170 S 1120 240, 1260 120" />
        <path d="M-40 210 C 160 140, 260 250, 460 160 S 760 60, 940 140 S 1120 210, 1260 90" />
        <path d="M-40 180 C 160 110, 260 220, 460 130 S 760 30, 940 110 S 1120 180, 1260 60" />
      </g>
    </svg>
  );
}
