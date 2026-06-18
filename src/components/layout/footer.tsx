import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>🛠️</span>
            <span>agent-toolkit — curated agents, skills & hooks</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link
              href="/install"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Install
            </Link>
            <a
              href="https://github.com/denis/agent-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Sources: superpowers · ECC · arckit · reflect-system · nas-agents — MIT License
        </div>
      </div>
    </footer>
  );
}