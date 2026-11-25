import type { ReactNode } from 'react';

type Tone = 'neutral' | 'accent' | 'success' | 'outline';

const tones: Record<Tone, string> = {
  neutral: 'bg-raised text-muted',
  accent: 'bg-active text-accent-text',
  success: 'bg-success/10 text-success',
  outline: 'border border-line text-muted',
};

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-1 font-mono text-xs uppercase tracking-widest ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
