import type { Roadmap } from '@stackpath/content';
import { statusFor, type TopicStatus } from './topic-state';

const stripClasses: Record<TopicStatus, string> = {
  completed: 'bg-success',
  current: 'bg-accent',
  upcoming: 'bg-line',
};

export function RouteStrip({
  roadmap,
  completed,
  label,
}: {
  roadmap: Roadmap;
  completed: ReadonlySet<string>;
  label: string;
}) {
  return (
    <div role="img" aria-label={label} className="mt-3 flex flex-wrap gap-1">
      {roadmap.nodes.map((node) => (
        <span
          key={node.id}
          className={`h-2 w-3 rounded-sm ${stripClasses[statusFor(roadmap, node, completed)]}`}
        />
      ))}
    </div>
  );
}
