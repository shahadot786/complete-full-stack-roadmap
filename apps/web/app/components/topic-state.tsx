import { useTranslation } from 'react-i18next';
import type { Roadmap, TopicNode } from '@stackpath/content';
import { Badge } from '@stackpath/ui';

export type TopicStatus = 'completed' | 'current' | 'upcoming';

export function statusFor(
  roadmap: Roadmap,
  node: TopicNode,
  completed: ReadonlySet<string>,
): TopicStatus {
  if (completed.has(node.id)) return 'completed';
  const current = roadmap.nodes.find((item) => !completed.has(item.id));
  return current?.id === node.id ? 'current' : 'upcoming';
}

export const stateRules: Record<TopicStatus, string> = {
  completed: 'border-l-2 border-success bg-success/10',
  current: 'border-l-2 border-accent bg-active',
  upcoming: 'border-l-2 border-ink',
};

export const stateMarkers: Record<TopicStatus, string> = {
  completed: 'text-success',
  current: 'text-accent-text',
  upcoming: 'text-muted',
};

export function TopicStateBadge({ status }: { status: TopicStatus }) {
  const { t } = useTranslation();
  const labels = {
    completed: 'common.completed',
    current: 'common.inProgress',
    upcoming: 'common.notStarted',
  } as const;
  const tones = {
    completed: 'success',
    current: 'accent',
    upcoming: 'outline',
  } as const;

  return <Badge tone={tones[status]}>{t(labels[status])}</Badge>;
}
