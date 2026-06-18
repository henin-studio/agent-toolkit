import Link from "next/link";
import { type Skill } from "@/lib/schemas";
import { CATEGORY_META, ORIGIN_META } from "@/lib/schemas";
import { Badge } from "@/components/ui/badge";
import { cn, formatName } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
  const catMeta = CATEGORY_META[skill.category];
  const originMeta = ORIGIN_META[skill.origin];

  return (
    <Link
      href={`/skills?name=${encodeURIComponent(skill.name)}`}
      className={cn(
        "group block rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {formatName(skill.name)}
            </h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {skill.description}
          </p>
        </div>
        {catMeta && (
          <span className="shrink-0 text-lg" title={catMeta.label}>
            {catMeta.emoji}
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {catMeta && (
          <Badge variant="secondary">
            {catMeta.label}
          </Badge>
        )}
        {originMeta && (
          <Badge variant="outline">
            {originMeta.label}
          </Badge>
        )}
      </div>
    </Link>
  );
}