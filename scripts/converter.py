#!/usr/bin/env python3
"""
agent-toolkit Multi-Platform Converter

Reads the canonical .claude/ source and generates platform-specific manifests:
  --codex    → .codex-plugin/plugin.json
  --cursor   → .cursor-plugin/plugin.json
  --gemini   → GEMINI.md
  --opencode → .opencode/plugins/agent-toolkit.js
  --all      → all of the above

Based on the converter pattern from arckit (tractorjuice/arc-kit).
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

TOOLKIT_ROOT = Path(__file__).resolve().parent.parent
CLAUDE_DIR = TOOLKIT_ROOT / ".claude"


def parse_frontmatter(content: str) -> dict[str, Any]:
    """Parse YAML frontmatter from markdown content."""
    if not content.startswith("---"):
        return {}
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return {}
    frontmatter = {}
    for line in match.group(1).split("\n"):
        line = line.strip()
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            # Handle lists
            if value.startswith("[") and value.endswith("]"):
                items = [i.strip().strip('"').strip("'") for i in value[1:-1].split(",")]
                frontmatter[key] = items
            elif value.startswith('"') or value.startswith("'"):
                frontmatter[key] = value[1:-1]
            else:
                frontmatter[key] = value
    return frontmatter


def read_agents() -> list[dict[str, Any]]:
    """Read all agent definitions from .claude/agents/."""
    agents = []
    agents_dir = CLAUDE_DIR / "agents"
    if not agents_dir.exists():
        return agents
    for f in sorted(agents_dir.glob("*.md")):
        content = f.read_text(encoding="utf-8")
        fm = parse_frontmatter(content)
        agents.append({
            "name": fm.get("name", f.stem),
            "description": fm.get("description", ""),
            "tools": fm.get("tools", []),
            "model": fm.get("model", "sonnet"),
            "effort": fm.get("effort", "medium"),
            "file": f".claude/agents/{f.name}",
        })
    return agents


def read_skills() -> list[dict[str, Any]]:
    """Read all skill definitions from .claude/skills/."""
    skills = []
    skills_dir = CLAUDE_DIR / "skills"
    if not skills_dir.exists():
        return skills
    for d in sorted(skills_dir.iterdir()):
        if not d.is_dir():
            continue
        skill_file = d / "SKILL.md"
        if not skill_file.exists():
            continue
        content = skill_file.read_text(encoding="utf-8")
        fm = parse_frontmatter(content)
        skills.append({
            "name": fm.get("name", d.name),
            "description": fm.get("description", ""),
            "origin": fm.get("origin", "unknown"),
            "file": f".claude/skills/{d.name}/SKILL.md",
        })
    return skills


def read_commands() -> list[dict[str, Any]]:
    """Read all command definitions from .claude/commands/."""
    commands = []
    commands_dir = CLAUDE_DIR / "commands"
    if not commands_dir.exists():
        return commands
    for f in sorted(commands_dir.glob("*.md")):
        content = f.read_text(encoding="utf-8")
        fm = parse_frontmatter(content)
        commands.append({
            "name": f.stem,
            "description": fm.get("description", ""),
            "argument_hint": fm.get("argument-hint", ""),
            "file": f".claude/commands/{f.name}",
        })
    return commands


def convert_codex(agents: list, skills: list, commands: list) -> None:
    """Generate Codex CLI plugin manifest."""
    output_dir = TOOLKIT_ROOT / ".codex-plugin"
    output_dir.mkdir(exist_ok=True)

    manifest = {
        "name": "agent-toolkit",
        "version": (TOOLKIT_ROOT / "VERSION").read_text().strip(),
        "description": "Curated agents, skills, and hooks for web development",
        "instructions_file": "../AGENTS.md",
        "agents": [
            {"name": a["name"], "description": a["description"]}
            for a in agents
        ],
        "skills": [
            {"name": s["name"], "description": s["description"]}
            for s in skills
        ],
        "commands": [
            {"name": c["name"], "description": c["description"]}
            for c in commands
        ],
    }

    (output_dir / "plugin.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"✅ Codex manifest → {output_dir / 'plugin.json'}")


def convert_cursor(agents: list, skills: list, commands: list) -> None:
    """Generate Cursor plugin manifest."""
    output_dir = TOOLKIT_ROOT / ".cursor-plugin"
    output_dir.mkdir(exist_ok=True)

    manifest = {
        "name": "agent-toolkit",
        "version": (TOOLKIT_ROOT / "VERSION").read_text().strip(),
        "description": "Curated agents, skills, and hooks for web development",
        "instructions_path": "../AGENTS.md",
        "agents_path": "../.claude/agents",
        "skills_path": "../.claude/skills",
        "commands_path": "../.claude/commands",
        "agents": [
            {"name": a["name"], "description": a["description"]}
            for a in agents
        ],
        "skills": [
            {"name": s["name"], "description": s["description"]}
            for s in skills
        ],
        "commands": [
            {"name": c["name"], "description": c["description"]}
            for c in commands
        ],
    }

    (output_dir / "plugin.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"✅ Cursor manifest → {output_dir / 'plugin.json'}")


def convert_gemini(agents: list, skills: list, commands: list) -> None:
    """Generate GEMINI.md instructions file."""
    lines = [
        "# Agent Toolkit — Gemini CLI Instructions",
        "",
        f"> Auto-generated by `scripts/converter.py --gemini`",
        f'> Do not edit manually — regenerate with `npm run convert:gemini`',
        "",
        "## Agents",
        "",
    ]
    for a in agents:
        lines.append(f"- **{a['name']}**: {a['description']}")
    lines.append("")
    lines.append("## Skills")
    lines.append("")
    for s in skills:
        origin_tag = f" ({s['origin']})" if s['origin'] != 'unknown' else ""
        lines.append(f"- **{s['name']}**: {s['description']}{origin_tag}")
    lines.append("")
    lines.append("## Commands")
    lines.append("")
    for c in commands:
        arg_hint = f" `{c['argument_hint']}`" if c.get('argument_hint') else ""
        lines.append(f"- `/{c['name']}`{arg_hint}: {c['description']}")
    lines.append("")
    lines.append("## Development")
    lines.append("")
    lines.append("```bash")
    lines.append("npm run dev          # Start dev server")
    lines.append("npm run build        # Production build")
    lines.append("npm run catalog      # Generate catalog")
    lines.append("npm run convert      # Convert to all platforms")
    lines.append("```")
    lines.append("")

    (TOOLKIT_ROOT / "GEMINI.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"✅ Gemini instructions → {TOOLKIT_ROOT / 'GEMINI.md'}")


def convert_opencode(agents: list, skills: list, commands: list) -> None:
    """Generate OpenCode plugin JS module."""
    output_dir = TOOLKIT_ROOT / ".opencode" / "plugins"
    output_dir.mkdir(parents=True, exist_ok=True)

    agent_names = [a["name"] for a in agents]
    skill_names = [s["name"] for s in skills]
    command_list = [{"name": c["name"], "description": c["description"]} for c in commands]

    js_content = f"""// Agent Toolkit — OpenCode Plugin
// Auto-generated by scripts/converter.py --opencode
// Do not edit manually — regenerate with `npm run convert:opencode`

const agents = {json.dumps(agent_names, indent=2)};
const skills = {json.dumps(skill_names, indent=2)};
const commands = {json.dumps(command_list, indent=2)};

function listAllSkills() {{ return skills; }}
function listAllAgents() {{ return agents; }}
function listCommands() {{ return commands; }}
function getSkillCount() {{ return skills.length; }}
function getAgentCount() {{ return agents.length; }}
function getCommandCount() {{ return commands.length; }}

module.exports = {{
  agents,
  skills,
  commands,
  listAllSkills,
  listAllAgents,
  listCommands,
  getSkillCount,
  getAgentCount,
  getCommandCount,
}};
"""

    (output_dir / "agent-toolkit.js").write_text(js_content, encoding="utf-8")
    print(f"✅ OpenCode plugin → {output_dir / 'agent-toolkit.js'}")


def main():
    parser = argparse.ArgumentParser(description="Agent Toolkit Multi-Platform Converter")
    parser.add_argument("--codex", action="store_true", help="Generate Codex CLI manifest")
    parser.add_argument("--cursor", action="store_true", help="Generate Cursor manifest")
    parser.add_argument("--gemini", action="store_true", help="Generate GEMINI.md")
    parser.add_argument("--opencode", action="store_true", help="Generate OpenCode plugin")
    parser.add_argument("--all", action="store_true", help="Generate all platforms")

    args = parser.parse_args()

    if not any([args.codex, args.cursor, args.gemini, args.opencode, args.all]):
        parser.print_help()
        sys.exit(1)

    print("📖 Reading .claude/ sources...")
    agents = read_agents()
    skills = read_skills()
    commands = read_commands()
    print(f"   Found {len(agents)} agents, {len(skills)} skills, {len(commands)} commands")
    print()

    if args.all or args.codex:
        convert_codex(agents, skills, commands)
    if args.all or args.cursor:
        convert_cursor(agents, skills, commands)
    if args.all or args.gemini:
        convert_gemini(agents, skills, commands)
    if args.all or args.opencode:
        convert_opencode(agents, skills, commands)

    print()
    print("✅ Conversion complete!")


if __name__ == "__main__":
    main()