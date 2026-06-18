import { z } from "zod";

/** Agent definition schema */
export const AgentSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tools: z.array(z.string()).default([]),
  model: z.enum(["sonnet", "opus", "haiku"]).default("sonnet"),
  effort: z.enum(["low", "medium", "high", "max"]).default("medium"),
  file: z.string().min(1),
  category: z.string().default("uncategorized"),
});

/** Skill definition schema */
export const SkillSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  origin: z.string().default("curated"),
  file: z.string().min(1),
  category: z.string().default("uncategorized"),
});

/** Command definition schema */
export const CommandSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  argumentHint: z.string().optional(),
  file: z.string().min(1),
});

/** Catalog stats schema */
export const CatalogStatsSchema = z.object({
  totalAgents: z.number(),
  totalSkills: z.number(),
  totalCommands: z.number(),
  agentsByCategory: z.record(z.string(), z.number()).default({}),
  skillsByCategory: z.record(z.string(), z.number()).default({}),
  skillsByOrigin: z.record(z.string(), z.number()).default({}),
});

/** Full catalog schema */
export const CatalogSchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  agents: z.array(AgentSchema),
  skills: z.array(SkillSchema),
  commands: z.array(CommandSchema),
  stats: CatalogStatsSchema,
});

/** Inferred types */
export type Agent = z.infer<typeof AgentSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Command = z.infer<typeof CommandSchema>;
export type CatalogStats = z.infer<typeof CatalogStatsSchema>;
export type Catalog = z.infer<typeof CatalogSchema>;

/** Category metadata for display */
export const CATEGORY_META: Record<string, { label: string; emoji: string; color: string }> = {
  design: { label: "Design", emoji: "🎨", color: "violet" },
  review: { label: "Review", emoji: "🔍", color: "blue" },
  methodology: { label: "Methodology", emoji: "📐", color: "amber" },
  web: { label: "Web", emoji: "🌐", color: "cyan" },
  planning: { label: "Planning", emoji: "📋", color: "green" },
  testing: { label: "Testing", emoji: "🧪", color: "red" },
  meta: { label: "Meta", emoji: "⚙️", color: "gray" },
  workflow: { label: "Workflow", emoji: "🔄", color: "indigo" },
  security: { label: "Security", emoji: "🔒", color: "orange" },
};

/** Origin metadata for display */
export const ORIGIN_META: Record<string, { label: string; color: string }> = {
  superpowers: { label: "Superpowers", color: "purple" },
  ECC: { label: "ECC", color: "blue" },
  curated: { label: "Curated", color: "green" },
  reflect: { label: "Reflect", color: "amber" },
};

/** Model display names */
export const MODEL_META: Record<string, { label: string; color: string }> = {
  opus: { label: "Opus", color: "purple" },
  sonnet: { label: "Sonnet", color: "blue" },
  haiku: { label: "Haiku", color: "green" },
};