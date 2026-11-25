import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import type { Roadmap } from '@stackpath/content';
import { NumberedMarker, buttonClasses } from '@stackpath/ui';
import {
  adjacentNode,
  buildGraphLayout,
  buildStackedLayout,
  GRAPH_NODE_HEIGHT,
  GRAPH_NODE_WIDTH,
  type ArrowDirection,
  type GraphEdgeState,
  type GraphNode,
} from '../lib/graph-layout';
import { stateRules, statusFor, type TopicStatus } from './topic-state';

const zoomLevels = [0.8, 1, 1.25] as const;
const edgeClasses: Record<GraphEdgeState, string> = {
  done: 'graph-edge graph-edge-done',
  current: 'graph-edge graph-edge-current',
  ahead: 'graph-edge graph-edge-ahead',
};
const markerTones: Record<TopicStatus, 'success' | 'accent' | 'ink'> = {
  completed: 'success',
  current: 'accent',
  upcoming: 'ink',
};
const statusLabels: Record<TopicStatus, string> = {
  completed: 'common.completed',
  current: 'common.inProgress',
  upcoming: 'common.notStarted',
};

const arrowKeys: Record<string, ArrowDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const useBeforePaint =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function RoadmapGraph({
  roadmap,
  completed,
}: {
  roadmap: Roadmap;
  completed: ReadonlySet<string>;
}) {
  const { t } = useTranslation();
  const [zoomIndex, setZoomIndex] = useState(1);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [stacked, setStacked] = useState(false);
  const anchors = useRef(new Map<string, HTMLAnchorElement>());

  useBeforePaint(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setStacked(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const layout = useMemo(
    () =>
      stacked
        ? buildStackedLayout(roadmap, completed)
        : buildGraphLayout(roadmap, completed),
    [roadmap, completed, stacked],
  );
  const statuses = useMemo(
    () =>
      new Map(
        roadmap.nodes.map((node) => [
          node.id,
          statusFor(roadmap, node, completed),
        ]),
      ),
    [roadmap, completed],
  );
  const previewNode = layout.nodes.find((node) => node.id === previewId);
  const zoom = zoomLevels[zoomIndex] ?? 1;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const id = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      '[data-graph-node]',
    )?.dataset.graphNode;
    if (!id) return;
    const direction = arrowKeys[event.key];
    if (direction) {
      event.preventDefault();
      const next = adjacentNode(layout, id, direction);
      if (next) anchors.current.get(next)?.focus();
      return;
    }
    if (event.key === 'Escape') setPreviewId(null);
  }

  function renderNode(node: GraphNode) {
    const status = statuses.get(node.id) ?? 'upcoming';
    return (
      <Link
        key={node.id}
        ref={(element) => {
          if (element) anchors.current.set(node.id, element);
          else anchors.current.delete(node.id);
        }}
        to={`/roadmaps/${roadmap.slug}/${node.slug}`}
        data-graph-node={node.id}
        aria-describedby={previewId === node.id ? 'graph-preview' : undefined}
        onMouseEnter={() => setPreviewId(node.id)}
        onMouseLeave={() => setPreviewId(null)}
        onFocus={() => setPreviewId(node.id)}
        onBlur={() => setPreviewId(null)}
        style={{
          left: node.x,
          top: node.y,
          width: GRAPH_NODE_WIDTH,
          height: GRAPH_NODE_HEIGHT,
        }}
        className={`${stateRules[status]} absolute flex flex-col justify-between rounded bg-surface p-3 transition-transform duration-150 hover:-translate-y-0.5`}
      >
        <NumberedMarker index={node.number} tone={markerTones[status]} />
        <span className="truncate text-xs font-medium">{node.title}</span>
        <span className="sr-only">{t(statusLabels[status])}</span>
      </Link>
    );
  }

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl">{t('graph.title')}</h2>
          <p className="mt-2 max-w-2xl text-muted">{t('graph.body')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setView(view === 'map' ? 'list' : 'map')}
            aria-pressed={view === 'list'}
            className={buttonClasses('outline', 'sm')}
          >
            {t(view === 'map' ? 'graph.listView' : 'graph.mapView')}
          </button>
          {view === 'map' && (
            <div className="flex items-center gap-1" role="group" aria-label={t('graph.zoom')}>
              <button
                type="button"
                onClick={() => setZoomIndex(Math.max(0, zoomIndex - 1))}
                disabled={zoomIndex === 0}
                aria-label={t('graph.zoomOut')}
                className={buttonClasses('ghost', 'sm')}
              >
                −
              </button>
              <button
                type="button"
                onClick={() => setZoomIndex(1)}
                disabled={zoomIndex === 1}
                aria-label={t('graph.resetZoom', {
                  percent: Math.round(zoom * 100),
                })}
                className={buttonClasses('ghost', 'sm')}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoomIndex(Math.min(zoomLevels.length - 1, zoomIndex + 1))}
                disabled={zoomIndex === zoomLevels.length - 1}
                aria-label={t('graph.zoomIn')}
                className={buttonClasses('ghost', 'sm')}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {view === 'map' ? (
        <div className="mt-8 overflow-x-auto rounded border border-line bg-surface">
          <div
            style={{
              width: layout.width * zoom,
              height: layout.height * zoom,
            }}
          >
            <div
              className="relative origin-top-left"
              onKeyDown={handleKeyDown}
              style={{
                width: layout.width,
                height: layout.height,
                transform: `scale(${zoom})`,
              }}
            >
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                width={layout.width}
                height={layout.height}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
              >
                {layout.edges.map((edge) => (
                  <path key={edge.id} d={edge.path} className={edgeClasses[edge.state]} />
                ))}
              </svg>
              {layout.columns.map((column, index) => (
                <div
                  key={column.id}
                  className="absolute flex items-center gap-2"
                  style={{
                    left: column.x,
                    top: column.y,
                    width: GRAPH_NODE_WIDTH,
                  }}
                >
                  <NumberedMarker index={index + 1} />
                  <span className="truncate font-mono text-xs uppercase tracking-widest text-muted">
                    {column.title}
                  </span>
                </div>
              ))}
              {layout.nodes.map(renderNode)}
              {previewNode && (
                <div
                  id="graph-preview"
                  role="tooltip"
                  className="pointer-events-none absolute z-10 rounded border border-accent bg-surface p-3"
                  style={{
                    left: previewNode.x,
                    top: previewNode.y + GRAPH_NODE_HEIGHT + 8,
                    width: GRAPH_NODE_WIDTH,
                  }}
                >
                  <p className="font-medium">{previewNode.title}</p>
                  <p className="mt-1 line-clamp-3 text-xs text-muted">
                    {roadmap.nodes.find((node) => node.id === previewNode.id)?.summary}
                  </p>
                  <p className="mt-2 font-mono text-xs text-accent-text">
                    {t('graph.previewOpen')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {[...roadmap.nodes]
            .sort((a, b) => a.order - b.order)
            .map((node) => {
              const status = statuses.get(node.id) ?? 'upcoming';
              return (
                <li key={node.id} className="flex items-center gap-3 py-3">
                  <span className={`font-mono text-xs ${stateRules[status]}`}>
                    {String(
                      layout.nodes.find((item) => item.id === node.id)?.number ?? 0,
                    ).padStart(2, '0')}
                  </span>
                  <Link
                    to={`/roadmaps/${roadmap.slug}/${node.slug}`}
                    className="flex-1 text-sm hover:text-accent-text"
                  >
                    {node.title}
                  </Link>
                  <span className="font-mono text-xs text-muted">
                    {t(statusLabels[status])}
                  </span>
                </li>
              );
            })}
        </ol>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <svg width="28" height="8" aria-hidden="true">
            <path d="M 1 4 L 27 4" className="graph-edge graph-edge-done" />
          </svg>
          {t('graph.legendDone')}
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="28" height="12" aria-hidden="true">
            <circle
              cx="14"
              cy="6"
              r="4"
              fill="none"
              stroke="var(--sp-accent)"
              strokeWidth="2"
            />
          </svg>
          {t('graph.legendCurrent')}
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="28" height="8" aria-hidden="true">
            <path d="M 1 4 L 27 4" className="graph-edge graph-edge-ahead" />
          </svg>
          {t('graph.legendAhead')}
        </span>
      </div>
    </section>
  );
}
