import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

const HOOKS = [
  {
    name: "session-start",
    event: "SessionStart",
    description:
      "Displays a welcome message with the current agent and skill counts at the start of each session.",
    action: "Log welcome banner",
  },
  {
    name: "pre-bash",
    event: "PreToolUse (Bash)",
    description:
      "Blocks dangerous shell commands (rm -rf /, sudo, force push, etc.) and warns on risky operations.",
    action: "Block dangerous commands",
  },
  {
    name: "pre-write",
    event: "PreToolUse (Write/Edit)",
    description:
      "Warns when writing to protected files (.env, secrets, credentials) and detects console.log in modified files.",
    action: "Protect sensitive files",
  },
  {
    name: "session-learn",
    event: "Stop",
    description:
      "Extracts learnings from the session and appends them to the session log for continuous improvement.",
    action: "Extract learnings",
  },
];

export default function HooksPage() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Hooks</h1>
        <p className="mt-2 text-muted-foreground">
          4 lifecycle hooks for safety, quality, and learning
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {HOOKS.map((hook) => (
          <div
            key={hook.name}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground">{hook.name}</h3>
                <Badge variant="outline" className="mt-1">
                  {hook.event}
                </Badge>
              </div>
              <span className="text-2xl">🪝</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {hook.description}
            </p>
            <div className="mt-3">
              <Badge variant="secondary">{hook.action}</Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-accent/50 p-6">
        <h2 className="text-lg font-bold text-foreground">Hook configuration</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Hooks are defined in <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.claude/hooks/hooks.json</code> and
          reference shell scripts in the same directory. They run automatically at
          key lifecycle points.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono text-foreground">
          {`{
  "hooks": [
    {
      "event": "SessionStart",
      "command": ".claude/hooks/session-start.sh"
    },
    {
      "event": "PreToolUse",
      "matcher": "Bash",
      "command": ".claude/hooks/pre-bash.sh"
    }
  ]
}`}
        </pre>
      </div>
    </Container>
  );
}