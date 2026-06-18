"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getSkills, getSkillCategories, getSkillOrigins, filterSkills, sortSkillsByName } from "@/lib/catalog";
import { type Skill } from "@/lib/schemas";
import { Container } from "@/components/ui/container";
import { SkillCard } from "@/components/catalog/skill-card";
import { SearchBar } from "@/components/catalog/search-bar";
import { CategoryFilter, OriginFilter } from "@/components/catalog/category-filter";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_META, ORIGIN_META } from "@/lib/schemas";

export function SkillsContent() {
  const searchParams = useSearchParams();
  const allSkills = sortSkillsByName(getSkills());
  const categories = getSkillCategories();
  const origins = getSkillOrigins();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("cat") ?? "");
  const [origin, setOrigin] = useState(searchParams.get("origin") ?? "");
  const [selectedName, setSelectedName] = useState(searchParams.get("name") ?? "");

  const filtered = useMemo(
    () => filterSkills(allSkills, { category, origin, search }),
    [allSkills, category, origin, search]
  );

  const selectedSkill = selectedName
    ? allSkills.find((s) => s.name === selectedName)
    : undefined;

  if (selectedSkill) {
    return <SkillDetail skill={selectedSkill} onBack={() => setSelectedName("")} />;
  }

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Skills</h1>
        <p className="mt-2 text-muted-foreground">
          {allSkills.length} curated skills for AI-assisted development
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search skills…"
        />
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
          type="skills"
        />
        <OriginFilter
          origins={origins}
          selected={origin}
          onSelect={setOrigin}
        />
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {allSkills.length} skills
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            className="cursor-pointer"
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg">No skills found matching your criteria.</p>
          <button
            onClick={() => { setSearch(""); setCategory(""); setOrigin(""); }}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </Container>
  );
}

function SkillDetail({ skill, onBack }: { skill: Skill; onBack: () => void }) {
  const catMeta = CATEGORY_META[skill.category];
  const originMeta = ORIGIN_META[skill.origin];

  return (
    <Container className="py-8">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-primary hover:underline"
      >
        ← Back to skills
      </button>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          {catMeta && <span className="text-3xl">{catMeta.emoji}</span>}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              {skill.name}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {catMeta && <Badge variant="secondary">{catMeta.label}</Badge>}
              {originMeta && <Badge variant="outline">{originMeta.label}</Badge>}
            </div>
          </div>
        </div>
        <p className="mt-4 text-foreground">{skill.description}</p>
        <div className="mt-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Install
          </h2>
          <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-sm font-mono">
            {`# Copy to your project's .claude/skills/ directory
cp -r .claude/skills/${skill.name} /path/to/project/.claude/skills/`}
          </pre>
        </div>
      </div>
    </Container>
  );
}