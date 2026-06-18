---
name: ai-coding-agents
description: Use when choosing, configuring, or integrating AI coding agents (Aider, Cline, Continue, OpenHands, Roo Code, Plandex, Goose, Tabby, Void, SWE-agent, or alternatives like free-claude-code). Covers terminal agents, IDE extensions, autonomous agents, and self-hosted solutions.
origin: ai-hub
---

# AI Coding Agents Landscape

> Comprehensive guide to open-source AI coding agents, IDE integrations, and self-hosted alternatives. Updated 2026-06.

## When to Activate

- Choosing an AI coding agent for a project or workflow
- Configuring or integrating a specific coding agent
- Comparing autonomous coding agents vs. copilot-style assistants
- Setting up self-hosted alternatives to commercial tools
- Building multi-agent coding pipelines
- Evaluating trade-offs between terminal, IDE, and autonomous agents

## Landscape Overview

### Category Matrix

| Agent | Type | Interface | Autonomy | Self-Hosted | Stars |
|-------|------|-----------|----------|-------------|-------|
| **Aider** | Terminal | CLI | Semi | ✅ | 24k |
| **Cline** | IDE | VS Code | High | ✅ | 37k |
| **Continue** | IDE | VS Code + JetBrains | Low | ✅ | 23k |
| **OpenHands** | Autonomous | Web UI | Full | ✅ | 48k |
| **Roo Code** | IDE | VS Code | High | ✅ | Archived |
| **Plandex** | Terminal | CLI | Semi | ✅ | 11k |
| **Goose** | Autonomous | CLI | Full | ✅ | Growing |
| **Tabby** | Self-hosted | API + IDE | Low | ✅ | 22k |
| **Void** | IDE | VS Code fork | Semi | ✅ | Deprecated |
| **SWE-agent** | Autonomous | CLI | Full | ✅ | 14k |

## Detailed Profiles

### 1. Aider — Terminal Coding Agent

**Repo**: `github.com/Aider-AI/aider` (24k ⭐) | **AI-HUB**: `02-AGENT-SYSTEMS/aider/`

**Best for**: Developers who live in the terminal and want AI pair programming with Git integration.

```bash
# Install
pip install aider-chat

# Use with local Ollama
aider --model ollama:llama3.3:70b

# Use with Claude
aider --model claude-sonnet-4-6

# Add specific files
aider src/app.py src/utils.py
```

**Key features**:
- Direct Git commits with descriptive messages
- Multi-file editing with context awareness
- Supports 100+ LLM providers (OpenAI, Anthropic, Ollama, local)
- Repo map for large codebase navigation
- Voice input support
- Linting and test integration

**When to choose Aider**:
- You prefer terminal workflow over IDE
- You need Git-native AI collaboration
- You want maximum model flexibility (local + cloud)
- You work on multiple files in a session

### 2. Cline — VS Code Autonomous Agent

**Repo**: `github.com/cline/cline` (37k ⭐) | **AI-HUB**: `11-AI-IDE-AGENTS/cline/`

**Best for**: Developers who want an AI agent that can plan, code, and debug autonomously inside VS Code.

```json
// VS Code settings.json
{
  "cline.apiProvider": "anthropic",
  "cline.anthropicApiKey": "sk-ant-...",
  "cline.autoApprove": "readonly",
  "cline.maxTokens": 8192
}
```

**Key features**:
- Plans before coding (asks for approval)
- Creates and edits files across the project
- Runs terminal commands
- Browses the web for documentation
- MCP (Model Context Protocol) server integration
- Checkpoints for undo

**When to choose Cline**:
- You work in VS Code primarily
- You want autonomous coding with human oversight
- You need browser-based research within your editor
- You want MCP integration for external tools

### 3. Continue — Drop-in Copilot Replacement

**Repo**: `github.com/continuedev/continue` (23k ⭐) | **AI-HUB**: `11-AI-IDE-AGENTS/continue/`

**Best for**: Teams wanting a self-hosted Copilot alternative with autocomplete, chat, and inline edits.

```json
// ~/.continue/config.json
{
  "models": [
    {
      "title": "Ollama Local",
      "provider": "ollama",
      "model": "llama3.3:70b"
    }
  ],
  "tabModified": true,
  "allowAnonymousTelemetry": false
}
```

**Key features**:
- Autocomplete (inline suggestions)
- Chat sidebar with context
- Inline edits (cmd+I)
- Runs on any model (local or cloud)
- VS Code + JetBrains support
- Custom slash commands and prompts

**When to choose Continue**:
- You want Copilot-like experience with any model
- You need JetBrains support alongside VS Code
- You prefer low-autonomy assistance over full agents
- Your team wants self-hosted with no data leaving the network

### 4. OpenHands — Full Autonomous Agent

**Repo**: `github.com/All-Hands-AI/OpenHands` (48k ⭐) | **AI-HUB**: `02-AGENT-SYSTEMS/openhands/`

**Best for**: Complex, multi-step tasks where you want the agent to work independently — write code, run tests, fix errors, repeat.

```bash
# Docker run
docker run -it --rm \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  ghcr.io/all-hands-ai/openhands:latest

# Or via CLI
pip install openhands
openhands run "Fix the authentication bug in auth.py"
```

**Key features**:
- Full sandboxed environment (Docker)
- Writes code, runs tests, reads output, fixes errors
- Web browsing for research
- Multiple LLM support
- Action space: file edit, bash, browser, think
- Works on GitHub issues end-to-end

**When to choose OpenHands**:
- You want fully autonomous software development
- You have complex, multi-step coding tasks
- You need sandboxed execution (security)
- You want to solve GitHub issues automatically

### 5. Roo Code — Aggressive Cline Fork

**Repo**: `github.com/RooCodeInc/Roo-Code` (archived 2026-05) | **AI-HUB**: `11-AI-IDE-AGENTS/Roo-Code/`

> ⚠️ **Archived** — Project was shut down on 2026-05-15. Use as reference only.

**Was best for**: Developers wanting more aggressive autonomy than Cline with multi-file edits, terminal execution, and browser control.

**Why it mattered**: Forked from Cline with enhanced autonomy. The codebase remains a valuable reference for building VS Code AI extensions with aggressive agent behavior.

**When to reference Roo Code**:
- Learning how to build VS Code AI extensions
- Understanding Cline's architecture from an alternative perspective
- Studying the fork divergence pattern (what autonomy features were added)

### 6. Plandex — Terminal Agent for Large Tasks

**Repo**: `github.com/plandex-ai/plandex` (11k ⭐) | **AI-HUB**: `11-AI-IDE-AGENTS/plandex/`

**Best for**: Large, multi-file tasks that require managing changes across dozens of files in a single session.

```bash
# Install
curl -sL https://plandex.ai/install.sh | bash

# Start a plan
plandex new my-feature

# Add context
plandex load src/**/*.ts

# Tell it what to do
plandex tell "Refactor the auth module to use JWT tokens"

# Review changes
plandex diff

# Apply
plandex apply
```

**Key features**:
- Manages context across many files without losing track
- Plan → review → apply workflow
- Branching and versioning of AI plans
- Terminal-native with Git integration
- Supports multiple LLM providers

**When to choose Plandex**:
- You work on large refactoring tasks (20+ files)
- You want to review AI changes before applying
- You prefer plan-based workflow over immediate edits
- You need context management for large codebases

### 7. Goose — Extensible Local Agent

**Repo**: `github.com/block/goose` | **AI-HUB**: `02-AGENT-SYSTEMS/goose/`

**Best for**: Developers who want a local, extensible agent that connects to MCP servers and handles full development workflows.

```bash
# Install
goose install

# Configure provider
go configure

# Run
goose session "Add unit tests for the auth module"
```

**Key features**:
- Runs locally, no cloud dependency
- MCP server integration for external tools
- Extensible via plugins
- Full development workflow (code, test, debug)
- Built by Block (Square)

**When to choose Goose**:
- You want fully local, no-cloud operation
- You need MCP server integration
- You want extensible plugin architecture
- You're building tool-connected workflows

### 8. Tabby — Self-Hosted Copilot

**Repo**: `github.com/TabbyML/tabby` (22k ⭐) | **AI-HUB**: `02-AGENT-SYSTEMS/tabby/`

**Best for**: Teams that need a self-hosted GitHub Copilot replacement where code never leaves the network.

```bash
# Docker deploy
docker run -it --rm -p 8080:8080 \
  -v ~/.tabby:/data \
  tabbyml/tabby \
  serve --model TabbyML/StarCoder-7B

# IDE extension
# Install Tabby extension in VS Code / JetBrains
```

**Key features**:
- Self-hosted (on-prem or cloud)
- Code never leaves your network
- Supports multiple models (StarCoder, CodeLlama, custom)
- IDE extensions for VS Code, JetBrains, Vim
- Team administration and analytics
- Fine-tuning on your codebase

**When to choose Tabby**:
- Your code cannot leave your network (compliance)
- You want to fine-tune on your proprietary codebase
- You need team analytics and admin controls
- You want autocomplete only (not full agent)

### 9. Void — Open-Source Cursor

**Repo**: `github.com/voideditor/void` (deprecated) | **AI-HUB**: `11-AI-IDE-AGENTS/void/`

> ⚠️ **Deprecated** — No longer maintained. Use as a reference for forking VS Code.

**Was best for**: Full Cursor alternative built on VS Code with agent mode, inline edits, and codebase chat.

**Why it mattered**: Best reference for forking VS Code into a custom AI editor. Codebase guide and contribution docs remain valuable.

**When to reference Void**:
- Learning how to fork VS Code for AI features
- Studying inline edit and chat implementation patterns
- Understanding VS Code extension architecture for AI

### 10. SWE-agent — Research-Grade Bug Fixer

**Repo**: `github.com/princeton-nlp/SWE-agent` (14k ⭐) | **AI-HUB**: `02-AGENT-SYSTEMS/SWE-agent/`

**Best for**: Automated bug fixing and issue resolution, especially on GitHub repos.

```bash
# Install
pip install sweagent

# Run on a GitHub issue
sweagent run \
  --agent_config default \
  --model_config anthropic \
  --repo_url https://github.com/owner/repo \
  --issue_url https://github.com/owner/repo/issues/123
```

**Key features**:
- Feeds repo directly to a model
- Navigates, edits, and fixes bugs like a human engineer
- Built by Princeton NLP research group
- Benchmark-validated on SWE-bench
- Configurable agent trajectories
- Docker-based sandboxed execution

**When to choose SWE-agent**:
- You want to automate GitHub issue resolution
- You need research-grade bug fixing
- You're benchmarking AI coding capabilities
- You want to understand how agents navigate codebases

## Supplementary Tools

### free-claude-code — Proxy for Free Local Models

**Repo**: `github.com/Alishahryar1/free-claude-code` | **AI-HUB**: `09-AGENT-SKILLS/repos/free-claude-code/`

Routes Claude Code CLI and Codex CLI traffic to any provider (Ollama, Groq, local models) through a proxy. Keeps each client's protocol stable while letting you choose models.

```bash
# Install
pip install free-claude-code

# Configure
fcc configure --provider ollama --model llama3.3:70b

# Use with Claude Code
# (automatic — proxy intercepts API calls)
```

**When to use**:
- You want Claude Code features with local models
- You need to route Codex CLI to non-OpenAI providers
- You want a single proxy for multiple AI coding tools

### AI-Engineering-Coach — Usage Analytics

**Repo**: `github.com/microsoft/AI-Engineering-Coach` | **AI-HUB**: `06-RESOURCES/AI-Engineering-Coach/`

Analyzes your AI coding assistant usage across any harness in one dashboard. Helps you understand and improve your AI coding workflows.

**When to use**:
- You want analytics on how you use AI coding agents
- You're optimizing prompt patterns and workflows
- You need cross-tool usage insights

### awesome-trading-agents — Trading Agent Collection

**Repo**: `github.com/LLMQuant/awesome-trading-agents` | **AI-HUB**: `02-AGENT-SYSTEMS/` (TradingAgents already cloned)

Curated list of trading agents and quantitative finance tools. Useful reference for building domain-specific autonomous agents.

## Decision Tree

```
What do you need?
│
├─► Pair programming in terminal?
│   └─► Aider (most mature, 100+ models, Git-native)
│
├─► Autonomous coding in VS Code?
│   ├─► Cline (stable, 37k ⭐, MCP support)
│   └─► Roo Code (archived, but reference for aggressive autonomy)
│
├─► Copilot-like autocomplete?
│   ├─► Continue (VS Code + JetBrains, any model)
│   └─► Tabby (self-hosted, team analytics)
│
├─► Fully autonomous (no human in the loop)?
│   ├─► OpenHands (48k ⭐, Docker sandbox, web browsing)
│   ├─► SWE-agent (research-grade, bug fixing)
│   └─► Goose (local, MCP extensible)
│
├─► Large multi-file refactoring?
│   └─► Plandex (plan → review → apply workflow)
│
├─► Self-hosted (code never leaves network)?
│   ├─► Tabby (autocomplete only)
│   └─► Aider + Ollama (full agent, local)
│
├─► Free local models with Claude Code?
│   └─► free-claude-code (proxy routing)
│
└─► Build your own AI IDE?
    └─► Void (VS Code fork reference, deprecated)
```

## Integration Patterns

### Pattern 1: Terminal Agent + IDE Agent

```bash
# Use Aider for focused coding sessions
aider --model ollama:llama3.3:70b src/auth.py

# Use Cline for exploratory work and debugging
# (VS Code extension handles planning and debugging)
```

### Pattern 2: Autonomous Agent + Human Review

```bash
# Let OpenHands work on an issue
openhands run "Implement user profile editing" --repo ./my-app

# Review with Plandex
plandex diff  # Review changes
plandex apply  # Apply if satisfied
```

### Pattern 3: Local-First Stack

```bash
# Tabby for autocomplete (self-hosted)
docker run -p 8080:8080 tabbyml/tabby serve --model TabbyML/StarCoder-7B

# Aider for complex refactoring (local model)
aider --model ollama:qwen3:32b

# Continue for chat (local model)
# Configure in ~/.continue/config.json with Ollama provider
```

### Pattern 4: Multi-Agent Pipeline

```python
# Step 1: SWE-agent fixes the bug
# Step 2: Aider refactors the fix
# Step 3: Cline reviews and tests
# Step 4: OpenHands runs full integration test
```

## Security Checklist

- [ ] **Sandbox**: Use Docker/containers for autonomous agents (OpenHands, SWE-agent)
- [ ] **Network**: Restrict autonomous agents to `allowed_domains` when browsing
- [ ] **API keys**: Store in environment variables or secret managers, never in config files
- [ ] **Review**: Always review AI-generated code before committing
- [ ] **Scope**: Limit file access for autonomous agents to relevant directories
- [ ] **Audit**: Use AI-Engineering-Coach for usage analytics and optimization
- [ ] **Self-host**: For sensitive codebases, use Tabby or local Ollama models

## AI-HUB Locations

| Agent | AI-HUB Path | Notes |
|-------|------------|-------|
| Aider | `02-AGENT-SYSTEMS/aider/` | Active |
| Cline | `11-AI-IDE-AGENTS/cline/` | Active |
| Continue | `11-AI-IDE-AGENTS/continue/` | Active |
| OpenHands | `02-AGENT-SYSTEMS/openhands/` | Active |
| Roo Code | `11-AI-IDE-AGENTS/Roo-Code/` | ⚠️ Archived 2026-05 |
| Plandex | `11-AI-IDE-AGENTS/plandex/` | Active |
| Goose | `02-AGENT-SYSTEMS/goose/` | Active |
| Tabby | `02-AGENT-SYSTEMS/tabby/` | Active |
| Void | `11-AI-IDE-AGENTS/void/` | ⚠️ Deprecated |
| SWE-agent | `02-AGENT-SYSTEMS/SWE-agent/` | Active |
| free-claude-code | `09-AGENT-SKILLS/repos/free-claude-code/` | Active |
| AI-Engineering-Coach | `06-RESOURCES/AI-Engineering-Coach/` | Active |
| TradingAgents | `02-AGENT-SYSTEMS/TradingAgents/` | Active |

## Focus Areas

- Choosing the right agent for the task (terminal, IDE, autonomous)
- Local-first and self-hosted configurations
- Multi-agent pipeline patterns
- Security and sandboxing for autonomous agents
- Model selection (local Ollama vs. cloud providers)

## Related

- Skill: `browser-use` — Browser automation for agents
- Agent: `browser-automator` — Browser automation agent
- Agent: `e2e-runner` — E2E testing specialist
- Skill: `systematic-debugging` — Debugging methodology for agent outputs