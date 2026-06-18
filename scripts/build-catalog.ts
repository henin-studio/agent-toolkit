/**
 * Build Catalog Script
 *
 * Reads .claude/ metadata (agents, skills, commands) and generates
 * src/data/catalog.json for the Next.js app.
 *
 * Usage: npx tsx scripts/build-catalog.ts
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const TOOLKIT_ROOT = resolve(__dirname, "..");
const CLAUDE_DIR = join(TOOLKIT_ROOT, ".claude");
const OUTPUT_FILE = join(TOOLKIT_ROOT, "src", "data", "catalog.json");

interface Agent {
  name: string;
  description: string;
  tools: string[];
  model: string;
  effort: string;
  file: string;
  category: string;
}

interface Skill {
  name: string;
  description: string;
  origin: string;
  file: string;
  category: string;
}

interface Command {
  name: string;
  description: string;
  argumentHint: string;
  file: string;
}

interface Catalog {
  version: string;
  generatedAt: string;
  agents: Agent[];
  skills: Skill[];
  commands: Command[];
  stats: {
    totalAgents: number;
    totalSkills: number;
    totalCommands: number;
    agentsByCategory: Record<string, number>;
    skillsByCategory: Record<string, number>;
    skillsByOrigin: Record<string, number>;
  };
}

// Category mapping for agents
const AGENT_CATEGORIES: Record<string, string[]> = {
  methodology: ["brainstorming", "writing-plans", "subagent-driven-dev", "systematic-debugging", "verification-before-completion"],
  review: ["architect", "code-reviewer", "security-reviewer", "tdd-guide", "build-error-resolver", "refactor-cleaner"],
  planning: ["planner", "explorer", "doc-updater"],
  web: ["typescript-reviewer", "react-reviewer", "python-reviewer", "fastapi-reviewer", "database-reviewer"],
  testing: ["e2e-runner", "loop-operator", "performance-optimizer"],
  design: ["senior-fullstack", "senior-ux", "accessibility"],
};

// Category mapping for skills
const SKILL_CATEGORIES: Record<string, string[]> = {
  methodology: ["brainstorming", "writing-plans", "executing-plans", "test-driven-development", "systematic-debugging", "subagent-driven-development"],
  workflow: ["receiving-code-review", "requesting-code-review", "finishing-a-development-branch", "using-git-worktrees", "verification-before-completion", "writing-skills"],
  testing: ["tdd-workflow"],
  security: ["security-review", "web-security-essentials"],
  web: ["frontend-patterns", "backend-patterns", "api-design", "react-patterns", "react-testing", "react-performance", "frontend-a11y", "frontend-design-direction"],
  planning: ["codebase-onboarding", "architecture-decision-records"],
  meta: ["continuous-learning-v2", "context-budget", "agent-eval", "reflect"],
};

function categorizeAgent(name: string): string {
  for (const [category, names] of Object.entries(AGENT_CATEGORIES)) {
    if (names.includes(name)) return category;
  }
  return "other";
}

function categorizeSkill(name: string): string {
  for (const [category, names] of Object.entries(SKILL_CATEGORIES)) {
    if (names.includes(name)) return category;
  }
  return "other";
}

function parseFrontmatter(content: string): Record<string, unknown> {
  if (!content.startsWith("---")) return {};
  const match = content.match(new RegExp("^---\\s*\\n(.*?)\\n---", "s"));
  if (!match) return {};

  const fm: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (trimmed.includes(":")) {
      const [key, ...rest] = trimmed.split(":");
      const value = rest.join(":").trim();
      if (value.startsWith("[") && value.endsWith("]")) {
        fm[key.trim()] = value
          .slice(1, -1)
          .split(",")
          .map((s: string) => s.trim().replace(/^["']|["']$/g, ""));
      } else if (value.startsWith('"') || value.startsWith("'")) {
        fm[key.trim()] = value.slice(1, -1);
      } else {
        fm[key.trim()] = value;
      }
    }
  }
  return fm;
}

function getVersion(): string {
  try {
    return readFileSync(join(TOOLKIT_ROOT, "VERSION"), "utf-8").trim();
  } catch {
    return "0.0.0";
  }
}

function readAgents(): Agent[] {
  const agentsDir = join(CLAUDE_DIR, "agents");
  const agents: Agent[] = [];

  try {
    const files = readdirSync(agentsDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const content = readFileSync(join(agentsDir, file), "utf-8");
      const fm = parseFrontmatter(content);
      const name = (fm.name as string) || file.replace(".md", "");
      agents.push({
        name,
        description: (fm.description as string) || "",
        tools: (fm.tools as string[]) || [],
        model: (fm.model as string) || "sonnet",
        effort: (fm.effort as string) || "medium",
        file: `.claude/agents/${file}`,
        category: categorizeAgent(name),
      });
    }
  } catch {
    // agents directory doesn't exist yet
  }

  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

function readSkills(): Skill[] {
  const skillsDir = join(CLAUDE_DIR, "skills");
  const skills: Skill[] = [];

  try {
    const dirs = readdirSync(skillsDir).filter((f) =>
      statSync(join(skillsDir, f)).isDirectory()
    );
    for (const dir of dirs) {
      const skillFile = join(skillsDir, dir, "SKILL.md");
      try {
        const content = readFileSync(skillFile, "utf-8");
        const fm = parseFrontmatter(content);
        const name = (fm.name as string) || dir;
        skills.push({
          name,
          description: (fm.description as string) || "",
          origin: (fm.origin as string) || "unknown",
          file: `.claude/skills/${dir}/SKILL.md`,
          category: categorizeSkill(name),
        });
      } catch {
        // SKILL.md doesn't exist yet
      }
    }
  } catch {
    // skills directory doesn't exist yet
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function readCommands(): Command[] {
  const commandsDir = join(CLAUDE_DIR, "commands");
  const commands: Command[] = [];

  try {
    const files = readdirSync(commandsDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const content = readFileSync(join(commandsDir, file), "utf-8");
      const fm = parseFrontmatter(content);
      commands.push({
        name: file.replace(".md", ""),
        description: (fm.description as string) || "",
        argumentHint: (fm["argument-hint"] as string) || "",
        file: `.claude/commands/${file}`,
      });
    }
  } catch {
    // commands directory doesn't exist yet
  }

  return commands.sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  console.log("📖 Reading .claude/ sources...");

  const agents = readAgents();
  const skills = readSkills();
  const commands = readCommands();

  const agentsByCategory: Record<string, number> = {};
  const skillsByCategory: Record<string, number> = {};
  const skillsByOrigin: Record<string, number> = {};

  for (const a of agents) {
    agentsByCategory[a.category] = (agentsByCategory[a.category] || 0) + 1;
  }
  for (const s of skills) {
    skillsByCategory[s.category] = (skillsByCategory[s.category] || 0) + 1;
    skillsByOrigin[s.origin] = (skillsByOrigin[s.origin] || 0) + 1;
  }

  const catalog: Catalog = {
    version: getVersion(),
    generatedAt: new Date().toISOString(),
    agents,
    skills,
    commands,
    stats: {
      totalAgents: agents.length,
      totalSkills: skills.length,
      totalCommands: commands.length,
      agentsByCategory,
      skillsByCategory,
      skillsByOrigin,
    },
  };

  // Ensure output directory exists
  const outputDir = join(TOOLKIT_ROOT, "src", "data");
  try {
    const { mkdirSync } = require("fs");
    mkdirSync(outputDir, { recursive: true });
  } catch {
    // Directory already exists
  }

  const { writeFileSync } = require("fs");
  writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2) + "\n", "utf-8");

  console.log(`✅ Catalog generated: ${agents.length} agents, ${skills.length} skills, ${commands.length} commands`);
  console.log(`   → ${OUTPUT_FILE}`);
}

main();