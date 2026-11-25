import { z } from 'zod';

export const resourceTypeSchema = z.enum([
  'doc',
  'video',
  'book',
  'course',
  'practice',
  'tool',
]);

export const resourceSchema = z.object({
  type: resourceTypeSchema,
  title: z.string().min(1),
  url: z.string().url(),
  provider: z.string().optional(),
  free: z.boolean().optional(),
  minutes: z.number().int().positive().optional(),
});

export const groupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().positive(),
});

export const topicSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(3).max(80),
  summary: z.string().min(20).max(200),
  groupId: z.string().min(1),
  order: z.number().int().positive(),
  optional: z.boolean(),
  outcomes: z.array(z.string()),
  prerequisites: z.array(z.string()),
  resources: z.array(resourceSchema),
  content: z.string().optional(),
});

export const edgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  kind: z.enum(['prereq', 'next']),
});

export const roadmapSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(3).max(80),
  description: z.string().min(20).max(200),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'mixed']),
  estimatedWeeks: z.number().int().positive(),
  status: z.enum(['full', 'outline']),
  icon: z.string().min(1),
  accent: z.string().regex(/^#[0-9a-f]{6}$/i),
  sourceFolder: z.string().min(1),
  groups: z.array(groupSchema),
  nodes: z.array(topicSchema),
  edges: z.array(edgeSchema),
});

export const roadmapIndexSchema = roadmapSchema
  .pick({
    slug: true,
    title: true,
    description: true,
    level: true,
    estimatedWeeks: true,
    status: true,
    icon: true,
    accent: true,
    sourceFolder: true,
  })
  .extend({
    topics: z.number().int().nonnegative(),
    resources: z.number().int().nonnegative(),
  });

export const contentIssueSchema = z.object({
  roadmap: z.string(),
  path: z.string(),
  message: z.string(),
});

export const contentReportSchema = z.object({
  corpus: z.object({
    markdownFiles: z.number().int().nonnegative(),
    resourceLinks: z.number().int().nonnegative(),
    uniqueResources: z.number().int().nonnegative(),
  }),
  roadmaps: z.array(
    z.object({
      slug: z.string(),
      status: z.enum(['full', 'outline']),
      groups: z.number().int().nonnegative(),
      nodes: z.number().int().nonnegative(),
      resources: z.number().int().nonnegative(),
    }),
  ),
  issues: z.array(contentIssueSchema),
});

export type ResourceType = z.infer<typeof resourceTypeSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type Group = z.infer<typeof groupSchema>;
export type TopicNode = z.infer<typeof topicSchema>;
export type Edge = z.infer<typeof edgeSchema>;
export type Roadmap = z.infer<typeof roadmapSchema>;
export type RoadmapIndexEntry = z.infer<typeof roadmapIndexSchema>;
export type ContentIssue = z.infer<typeof contentIssueSchema>;
export type ContentReport = z.infer<typeof contentReportSchema>;
