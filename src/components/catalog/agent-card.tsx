import Link from "next/link";
import { type Agent } from "@/lib/schemas";
import { CATEGORY_META, MODEL_META } from "@/lib/schemas";
import { Badge } from "@/components/ui/badge";
import { cn, formatName } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const catMeta = CATEGORY_META[agent.category];
  const modelMeta = MODEL_META[agent.model];

  return (
    <Link
      href={`/agents?name=${encodeURIComponent(agent.name)}`}
      className={cn(
        "group block rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {formatName(agent.name)}
            </h3>
            {modelMeta && (
              <Badge variant="outline" className="shrink-0">
                {modelMeta.label}
              </Badge>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {agent.description}
          </p>
        </div>
        {catMeta && (
          <span className="shrink-0 text-lg" title={catMeta.label}>
            {catMeta.emoji}
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {agent.tools.slice(0, 5).map((tool) => (
          <Badge key={tool} variant="default">
            {tool}
          </Badge>
        ))}
        {agent.tools.length > 5 && (
          <Badge variant="outline">+{agent.tools.length - 5}</Badge>
        )}
      </div>
    </Link>
  );
}