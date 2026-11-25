import type { ReactNode } from 'react';

type Rule = 'none' | 'ink' | 'accent' | 'success';

const rules: Record<Rule, string> = {
  none: '',
  ink: 'border-l-2 border-ink',
  accent: 'border-l-2 border-accent',
  success: 'border-l-2 border-success',
};

export function Card({
  rule = 'none',
  active = false,
  className = '',
  children,
}: {
  rule?: Rule;
  active?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border border-line bg-surface ${rules[rule]} ${active ? 'bg-active' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
