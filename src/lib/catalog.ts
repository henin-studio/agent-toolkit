import catalogData from "@/data/catalog.json";
import {
  type Agent,
  type Skill,
  type Command,
  type Catalog,
  type CatalogStats,
  AgentSchema,
  SkillSchema,
  CommandSchema,
  CatalogSchema,
} from "@/lib/schemas";

/** Validate and parse the catalog at module load time */
let _catalog: Catalog | null = null;

function getCatalog(): Catalog {
  if (!_catalog) {
    _catalog = CatalogSchema.parse(catalogData);
  }
  return _catalog;
}

/** Get all agents */
export function getAgents(): Agent[] {
  return getCatalog().agents;
}

/** Get a single agent by name */
export function getAgent(name: string): Agent | undefined {
  return getAgents().find((a) => a.name === name);
}

/** Get all skills */
export function getSkills(): Skill[] {
  return getCatalog().skills;
}

/** Get a single skill by name */
export function getSkill(name: string): Skill | undefined {
  return getSkills().find((s) => s.name === name);
}

/** Get all commands */
export function getCommands(): Command[] {
  return getCatalog().commands;
}

/** Get catalog stats */
export function getStats(): CatalogStats {
  return getCatalog().stats;
}

/** Get unique agent categories */
export function getAgentCategories(): string[] {
  return [...new Set(getAgents().map((a) => a.category))];
}

/** Get unique skill categories */
export function getSkillCategories(): string[] {
  return [...new Set(getSkills().map((s) => s.category))];
}

/** Get unique skill origins */
export function getSkillOrigins(): string[] {
  return [...new Set(getSkills().map((s) => s.origin))];
}

/** Filter agents by category and search query */
export function filterAgents(
  agents: Agent[],
  filters: { category?: string; search?: string }
): Agent[] {
  return agents.filter((agent) => {
    if (filters.category && agent.category !== filters.category) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        agent.name.toLowerCase().includes(q) ||
        agent.description.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

/** Filter skills by category, origin, and search query */
export function filterSkills(
  skills: Skill[],
  filters: { category?: string; origin?: string; search?: string }
): Skill[] {
  return skills.filter((skill) => {
    if (filters.category && skill.category !== filters.category) return false;
    if (filters.origin && skill.origin !== filters.origin) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

/** Sort agents by name */
export function sortAgentsByName(agents: Agent[]): Agent[] {
  return [...agents].sort((a, b) => a.name.localeCompare(b.name));
}

/** Sort skills by name */
export function sortSkillsByName(skills: Skill[]): Skill[] {
  return [...skills].sort((a, b) => a.name.localeCompare(b.name));
}