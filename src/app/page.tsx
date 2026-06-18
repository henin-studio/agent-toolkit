import Link from "next/link";
import { getAgents, getSkills, getCommands, getStats } from "@/lib/catalog";
import { Container } from "@/components/ui/container";
import { AgentCard } from "@/components/catalog/agent-card";
import { SkillCard } from "@/components/catalog/skill-card";
import { Badge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";

export default function HomePage() {
  const agents = getAgents();
  const skills = getSkills();
  const commands = getCommands();
  const stats = getStats();

  const featuredAgents = agents.slice(0, 6);
  const featuredSkills = skills.slice(0, 6);

  return (
    <Container className="py-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          🛠️ agent-toolkit
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Curated agents, skills &amp; hooks for AI-assisted web development.
          Install in any project — works with Claude Code, Codex, Cursor, Gemini &amp; OpenCode.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/install"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Install →
          </Link>
          <Link
            href="/agents"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Browse agents
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Agents", value: stats.totalAgents, emoji: "🤖" },
          { label: "Skills", value: stats.totalSkills, emoji: "⚡" },
          { label: "Commands", value: stats.totalCommands, emoji: "💻" },
          { label: "Hooks", value: 4, emoji: "🪝" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-4 text-center"
          >
            <div className="text-2xl">{stat.emoji}</div>
            <div className="mt-1 text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Platforms */}
      <section className="mt-12 text-center">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Compatible with
        </h2>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {["Claude Code", "Codex CLI", "Cursor", "Gemini CLI", "OpenCode"].map(
            (platform) => (
              <Badge key={platform} variant="secondary" className="text-sm px-4 py-1.5">
                {platform}
              </Badge>
            )
          )}
        </div>
      </section>

      {/* Featured Agents */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Agents</h2>
          <Link
            href="/agents"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>
      </section>

      {/* Featured Skills */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Skills</h2>
          <Link
            href="/skills"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </section>

      {/* Sources */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Sources</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Superpowers", desc: "Multi-agent skills, TDD, plans", count: "12 skills" },
            { name: "ECC", desc: "Cybersecurity & Claude agents", count: "14 skills" },
            { name: "Arckit", desc: "Architecture governance", count: "1 agent" },
            { name: "Reflect", desc: "Self-learning system", count: "1 skill" },
          ].map((source) => (
            <div
              key={source.name}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h3 className="font-semibold text-foreground">{source.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{source.desc}</p>
              <p className="mt-2 text-xs text-muted-foreground">{source.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="mt-16 mb-8 rounded-lg border border-border bg-accent/50 p-6">
        <h2 className="text-lg font-bold text-foreground">Quick start</h2>
        <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono text-foreground">
          {`# Install into any project
bash scripts/install.sh /path/to/your-project

# Or convert for a specific platform
npm run convert:codex    # Codex CLI
npm run convert:cursor   # Cursor
npm run convert:gemini   # Gemini CLI
npm run convert:opencode # OpenCode`}
        </pre>
        <p className="mt-3 text-sm text-muted-foreground">
          See the <Link href="/install" className="text-primary hover:underline">install guide</Link> for details.
        </p>
      </section>
    </Container>
  );
}