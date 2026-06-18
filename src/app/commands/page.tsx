import { getCommands } from "@/lib/catalog";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";

export default function CommandsPage() {
  const commands = getCommands();

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Commands</h1>
        <p className="mt-2 text-muted-foreground">
          {commands.length} slash commands for Claude Code
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {commands.map((cmd) => (
          <div
            key={cmd.name}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-2">
              <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono text-primary">
                /{cmd.name}
              </code>
              {cmd.argumentHint && (
                <span className="text-xs text-muted-foreground">
                  {cmd.argumentHint}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {cmd.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-accent/50 p-6">
        <h2 className="text-lg font-bold text-foreground">How to use</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Commands are invoked in Claude Code with <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">/{`<command>`}</code>.
          They trigger the corresponding skill with the provided arguments.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono text-foreground">
          {`# Example: run the TDD workflow
/tdd "implement user authentication"

# Example: run security scan
/security-scan

# Example: create a plan
/plan "refactor payment module"`}
        </pre>
      </div>
    </Container>
  );
}