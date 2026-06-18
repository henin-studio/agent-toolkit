import Link from "next/link";
import { HeaderNav } from "./nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">🛠️</span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            agent-toolkit
          </span>
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}