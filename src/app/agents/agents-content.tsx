"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getAgents, getAgentCategories, filterAgents, sortAgentsByName } from "@/lib/catalog";
import { type Agent } from "@/lib/schemas";
import { Container } from "@/components/ui/container";
import { AgentCard } from "@/components/catalog/agent-card";
import { SearchBar } from "@/components/catalog/search-bar";
import { CategoryFilter } from "@/components/catalog/category-filter";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_META, MODEL_META } from "@/lib/schemas";

export function AgentsContent() {
  const searchParams = useSearchParams();
  const allAgents = sortAgentsByName(getAgents());
  const categories = getAgentCategories();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("cat") ?? "");
  const [selectedName, setSelectedName] = useState(searchParams.get("name") ?? "");

  const filtered = useMemo(
    () => filterAgents(allAgents, { category, search }),
    [allAgents, category, search]
  );

  const selectedAgent = selectedName
    ? allAgents.find((a) => a.name === selectedName)
    : undefined;

  if (selectedAgent) {
    return <AgentDetail agent={selectedAgent} onBack={() => setSelectedName("")} />;
  }

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Agents</h1>
        <p className="mt-2 text-muted-foreground">
          {allAgents.length} curated agents for AI-assisted development
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search agents…"
        />
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
          type="agents"
        />
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {allAgents.length} agents
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((agent) => (
          <AgentCard
            key={agent.name}
            agent={agent}
            className="cursor-pointer"
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg">No agents found matching your criteria.</p>
          <button
            onClick={() => { setSearch(""); setCategory(""); }}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </Container>
  );
}

function AgentDetail({ agent, onBack }: { agent: Agent; onBack: () => void }) {
  const catMeta = CATEGORY_META[agent.category];
  const modelMeta = MODEL_META[agent.model];

  return (
    <Container className="py-8">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-primary hover:underline"
      >
        ← Back to agents
      </button>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          {catMeta && <span className="text-3xl">{catMeta.emoji}</span>}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              {agent.name}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {catMeta && <Badge variant="secondary">{catMeta.label}</Badge>}
              {modelMeta && <Badge variant="outline">{modelMeta.label}</Badge>}
              <Badge variant="outline">Effort: {agent.effort}</Badge>
            </div>
          </div>
        </div>
        <p className="mt-4 text-foreground">{agent.description}</p>
        <div className="mt-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Tools
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {agent.tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Install
          </h2>
          <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-sm font-mono">
            {`# Copy to your project's .claude/agents/ directory
cp .claude/agents/${agent.name}.md /path/to/project/.claude/agents/`}
          </pre>
        </div>
      </div>
    </Container>
  );
}