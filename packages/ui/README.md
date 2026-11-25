# @stackpath/ui

Shared primitives for StackPath. Behaviour comes from shadcn/ui patterns;
surfaces, radii and colour are deliberately StackPath's own.

## Divergence from roadmap.sh

roadmap.sh uses a dark slate canvas, indigo accents, compact sans headings,
dense pill nodes and ring-based progress. StackPath uses:

| | roadmap.sh | StackPath |
|---|---|---|
| Default theme | dark slate | warm paper `#F7F4EC` |
| Accent | indigo | vermillion `#C8452D` |
| Headings | sans | Instrument Serif |
| Nodes | rounded pills | numbered cards with an ink left rule |
| Progress | ring | route line across the map |
| Radii | pill-heavy | 4 / 6 / 8 |

Do not reintroduce gradients, glass, glow, pill buttons or emoji icons.
See `docs/plans/roadmap-platform/brief.md` → Design direction.
