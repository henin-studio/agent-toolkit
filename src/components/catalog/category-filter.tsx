"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_META, ORIGIN_META } from "@/lib/schemas";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  type?: "agents" | "skills";
  className?: string;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
  type = "agents",
  className,
}: CategoryFilterProps) {
  const meta = type === "agents" ? CATEGORY_META : CATEGORY_META;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onSelect("")}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          selected === ""
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        All
      </button>
      {categories.map((cat) => {
        const m = meta[cat];
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              selected === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {m ? `${m.emoji} ${m.label}` : cat}
          </button>
        );
      })}
    </div>
  );
}

interface OriginFilterProps {
  origins: string[];
  selected: string;
  onSelect: (origin: string) => void;
  className?: string;
}

export function OriginFilter({
  origins,
  selected,
  onSelect,
  className,
}: OriginFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onSelect("")}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          selected === ""
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        All origins
      </button>
      {origins.map((origin) => {
        const m = ORIGIN_META[origin];
        return (
          <button
            key={origin}
            onClick={() => onSelect(origin)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              selected === origin
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {m ? m.label : origin}
          </button>
        );
      })}
    </div>
  );
}