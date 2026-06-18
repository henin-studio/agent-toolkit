import { Container } from "@/components/ui/container";

export default function InstallPage() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Install</h1>
        <p className="mt-2 text-muted-foreground">
          Get agent-toolkit running in your project in under a minute
        </p>
      </div>

      {/* Quick install */}
      <section className="mb-12 rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-bold text-foreground">Quick install</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Clone the repo and run the installer. It copies the <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.claude/</code> directory
          into your target project, preserving any existing files.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono text-foreground">
          {`# Clone the toolkit
git clone https://github.com/denis/agent-toolkit.git
cd agent-toolkit

# Install into your project
bash scripts/install.sh /path/to/your-project`}
        </pre>
      </section>

      {/* Platform-specific */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-6">Platform-specific conversion</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              platform: "Claude Code",
              emoji: "🤖",
              desc: "Native .claude/ format — agents, skills, commands, hooks, rules",
              cmd: "bash scripts/install.sh /path/to/project",
            },
            {
              platform: "Codex CLI",
              emoji: "⚡",
              desc: "Converts to .codex-plugin/plugin.json format",
              cmd: "npm run convert:codex",
            },
            {
              platform: "Cursor",
              emoji: "🖱️",
              desc: "Converts to .cursor-plugin/plugin.json format",
              cmd: "npm run convert:cursor",
            },
            {
              platform: "Gemini CLI",
              emoji: "💎",
              desc: "Converts to GEMINI.md instructions",
              cmd: "npm run convert:gemini",
            },
            {
              platform: "OpenCode",
              emoji: "🔓",
              desc: "Converts to .opencode/plugins/agent-toolkit.js",
              cmd: "npm run convert:opencode",
            },
          ].map((item) => (
            <div
              key={item.platform}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="font-semibold text-foreground">{item.platform}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-3 text-xs font-mono">
                {item.cmd}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* What gets installed */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-6">What gets installed</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { emoji: "🤖", label: "25 Agents", desc: "Specialized AI agents for design, review, planning, testing & more" },
            { emoji: "⚡", label: "29 Skills", desc: "Slash commands and skills for every development workflow" },
            { emoji: "💻", label: "8 Commands", desc: "Pre-built commands: /plan, /tdd, /review, /security-scan, etc." },
            { emoji: "🪝", label: "4 Hooks", desc: "Lifecycle hooks for safety, quality & continuous learning" },
            { emoji: "📐", label: "14 Rules", desc: "Coding standards for Python, React, TypeScript & web" },
            { emoji: "⚙️", label: "Settings", desc: "Project settings with permissions & tool allowlists" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="text-2xl">{item.emoji}</div>
              <h3 className="mt-2 font-semibold text-foreground">{item.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* After install */}
      <section className="mb-12 rounded-lg border border-border bg-accent/50 p-6">
        <h2 className="text-xl font-bold text-foreground">After installing</h2>
        <ol className="mt-4 space-y-3 text-sm text-foreground">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
            <span>Open your project in <strong>Claude Code</strong> — agents, skills & commands are available immediately.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
            <span>Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono">/plan</code> to plan a task, <code className="rounded bg-muted px-1.5 py-0.5 font-mono">/tdd</code> for TDD workflow, <code className="rounded bg-muted px-1.5 py-0.5 font-mono">/review</code> for code review.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
            <span>Agents are invoked with <code className="rounded bg-muted px-1.5 py-0.5 font-mono">/agent architect</code>, <code className="rounded bg-muted px-1.5 py-0.5 font-mono">/agent tdd-guide</code>, etc.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
            <span>Customize: edit <code className="rounded bg-muted px-1.5 py-0.5 font-mono">.claude/settings.json</code> to add/remove tools, models, and permissions.</span>
          </li>
        </ol>
      </section>
    </Container>
  );
}