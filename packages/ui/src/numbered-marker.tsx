export function NumberedMarker({
  index,
  tone = 'ink',
}: {
  index: number;
  tone?: 'ink' | 'accent' | 'success';
}) {
  const tones = {
    ink: 'bg-ink text-white',
    accent: 'bg-accent text-white',
    success: 'bg-success text-white',
  } as const;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-xs ${tones[tone]}`}
    >
      {String(index).padStart(2, '0')}
    </span>
  );
}
