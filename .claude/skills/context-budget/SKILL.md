---
name: context-budget
description: Use when context window is getting full, when agents or skills are consuming too many tokens, or when auditing the efficiency of your Claude Code configuration.
origin: ECC
---

# Context Budget

> Source: ECC | License: MIT

## When to Activate

- Context window is filling up (last 20% remaining)
- Agent or skill descriptions seem bloated
- Performance is degrading due to token consumption
- After adding new agents, skills, or MCP servers
- When planning which components to load

## Instructions

Audit your context window consumption and optimize for efficiency.

### Phase 1: Inventory

Count tokens consumed by each component:

| Component | How to Measure | Typical Range |
|-----------|---------------|---------------|
| Agents | Count lines in agent definitions x 1.3 | 50-500 tokens each |
| Skills | Count lines x 1.3 (prose) or chars/4 (code-heavy) | 100-2000 tokens each |
| Rules | Count lines in rule files | 50-500 tokens each |
| MCP Servers | Count tool schemas (~500 tokens each) | 200-2000 tokens each |
| CLAUDE.md | Count lines in project CLAUDE.md | 200-5000 tokens |

### Phase 2: Classify

Sort each component into three categories:
- **Always needed**: Core functionality, used every session
- **Sometimes needed**: Domain-specific, loaded on demand
- **Rarely needed**: Niche tools, consider removing

### Phase 3: Detect Issues

Flag these problems:
- **Bloated agent descriptions**: Agents with >500 tokens that aren't used every session
- **Heavy MCP subscriptions**: MCP servers loaded but rarely used (biggest lever — ~500 tokens per tool schema)
- **Redundant components**: Multiple agents/skills covering the same ground
- **CLAUDE.md bloat**: Project instructions over 50 lines

### Phase 4: Report

Produce a budget report:
```
Context Budget Report
====================
Total tokens: ~8,000 / 200,000 (4%)

Components:
  Always needed:  3,200 tokens (6 agents, 3 skills)
  Sometimes needed: 4,500 tokens (12 agents, 8 skills)
  Rarely needed:  3,300 tokens (7 agents, 4 skills, 2 MCP)

Top 3 optimizations:
  1. Remove rarely-used MCP server "xyz" (-1,500 tokens)
  2. Trim agent descriptions for "specialist-1" (-200 tokens)
  3. Move niche skills to on-demand loading (-800 tokens)

Potential savings: 2,500 tokens
```

### Optimization Strategies

1. **Unsubscribe MCP tools**: The biggest single lever (~500 tokens per tool schema)
2. **Shorten agent descriptions**: Cut verbose descriptions to essential triggers
3. **Move niche skills to on-demand**: Don't load skills that aren't used every session
4. **Trim CLAUDE.md**: Keep under 50 lines, details go in docs/
5. **Remove redundancy**: One agent per concern, one skill per pattern

## Focus Areas

- Token consumption auditing
- MCP server optimization (biggest lever)
- Agent description trimming
- Skill loading strategy (always vs. on-demand)
- CLAUDE.md size management

## Examples

**Auditing a bloated configuration:**
> 3 MCP servers loaded (1,500 tokens each), 15 agents (200 tokens each), 40 skills loaded always
> Action: Move 25 skills to on-demand, unsubscribe 1 MCP server, trim 5 agent descriptions
> Savings: ~4,000 tokens