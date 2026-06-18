# CLAUDE.md — agent-toolkit

**Derniere mise a jour**: 2026-06-18
**Projet**: agent-toolkit — Agents, skills et hooks curates pour le developpement web

---

## Apercu du projet / Project Overview

Agent-toolkit est une collection curee d'agents, skills et hooks pour le developpement web, issue des sources AI-HUB (superpowers, ECC, arckit, reflect-system, nas-agents). Le toolkit fonctionne sur deux couches :

1. **Couche infrastructure** (`.claude/`) : fichiers Markdown/JSON definissant agents, skills, commandes, regles et hooks, portables entre plateformes
2. **Couche catalogue** (app Next.js) : interface web pour parcourir, installer et gerer les composants du toolkit

Le convertisseur (`scripts/converter.py`) genere les manifestes pour Codex, Cursor, Gemini et OpenCode a partir de la source `.claude/`.

---

## Architecture

```
agent-toolkit/
├── .claude/                     # Couche infrastructure (source de verite)
│   ├── agents/                  # 13 agents (Markdown avec frontmatter)
│   │   ├── architect.md
│   │   ├── brainstorming.md
│   │   ├── build-error-resolver.md
│   │   ├── code-reviewer.md
│   │   ├── doc-updater.md
│   │   ├── planner.md
│   │   ├── refactor-cleaner.md
│   │   ├── security-reviewer.md
│   │   ├── systematic-debugging.md
│   │   ├── tdd-guide.md
│   │   ├── typescript-reviewer.md
│   │   ├── verification-before-completion.md
│   │   └── writing-plans.md
│   ├── skills/                  # 29 skills (repertoires avec SKILL.md)
│   │   ├── agent-eval/
│   │   ├── api-design/
│   │   ├── architecture-decision-records/
│   │   ├── backend-patterns/
│   │   ├── brainstorming/
│   │   ├── codebase-onboarding/
│   │   ├── context-budget/
│   │   ├── continuous-learning-v2/
│   │   ├── executing-plans/
│   │   ├── finishing-a-development-branch/
│   │   ├── frontend-a11y/
│   │   ├── frontend-design-direction/
│   │   ├── frontend-patterns/
│   │   ├── react-patterns/
│   │   ├── react-performance/
│   │   ├── react-testing/
│   │   ├── receiving-code-review/
│   │   ├── reflect/
│   │   ├── requesting-code-review/
│   │   ├── security-review/
│   │   ├── subagent-driven-development/
│   │   ├── systematic-debugging/
│   │   ├── tdd-workflow/
│   │   ├── test-driven-development/
│   │   ├── using-git-worktrees/
│   │   ├── verification-before-completion/
│   │   ├── web-security-essentials/
│   │   ├── writing-plans/
│   │   └── writing-skills/
│   ├── commands/                # 8 commandes (Markdown avec frontmatter)
│   │   ├── build-fix.md
│   │   ├── code-review.md
│   │   ├── learn.md
│   │   ├── plan.md
│   │   ├── quality-gate.md
│   │   ├── reflect.md
│   │   ├── security-scan.md
│   │   └── tdd.md
│   ├── rules/                   # 9 regles par domaine
│   │   ├── python/              # securite, testing
│   │   ├── react/               # patterns, securite, testing
│   │   ├── typescript/          # patterns, securite
│   │   └── web/                 # performance, securite
│   ├── hooks/                   # Hooks Claude Code
│   │   ├── hooks.json           # Configuration des hooks
│   │   ├── session-start.sh     # Hook de debut de session
│   │   ├── pre-bash.sh          # Protection commandes dangereuses
│   │   ├── pre-write.sh         # Protection fichiers sensibles
│   │   └── session-learn.sh     # Extraction de learnings
│   ├── settings.json            # Parametres projet Claude Code
│   └── docs/                    # Documentation auto-generee
│       └── session-log.md       # Journal de sessions
├── .claude-plugin/              # Manifeste plugin Claude Code
│   └── plugin.json
├── .codex-plugin/               # Manifeste plugin Codex
│   └── plugin.json
├── .cursor-plugin/              # Manifeste plugin Cursor
│   └── plugin.json
├── .opencode/                   # Plugin OpenCode
│   └── plugins/
│       └── agent-toolkit.js
├── src/                         # App catalogue Next.js
│   ├── app/                     # App Router (pages, layouts)
│   ├── components/              # Composants React
│   ├── lib/                     # Utilitaires et schemas Zod
│   └── data/                    # Donnees catalogue (auto-generees)
├── scripts/                     # Scripts utilitaires
│   ├── build-catalog.ts         # Generation du catalogue
│   └── converter.py             # Conversion multi-plateforme
├── tests/                       # Tests unitaires et E2E
├── pilot/                       # Gouvernance projet
├── AGENTS.md                    # Spec agents.md (lisible par tous les agents)
├── GEMINI.md                    # Instructions Gemini CLI
└── CLAUDE.md                    # Ce fichier
```

---

## Commandes de developpement / Development Commands

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de dev Next.js (port 3000) |
| `npm run build` | Build production Next.js |
| `npm run lint` | Lint ESLint |
| `npm run catalog` | Generer le catalogue depuis `.claude/` (build-catalog.ts) |
| `npm run convert` | Convertir vers toutes les plateformes |
| `npm run convert:codex` | Convertir vers Codex CLI |
| `npm run convert:cursor` | Convertir vers Cursor |
| `npm run convert:gemini` | Convertir vers Gemini CLI |
| `npm run convert:opencode` | Convertir vers OpenCode |

---

## Attribution des sources / Source Attribution

Les agents, skills et hooks proviennent de depots AI-HUB cures et adaptes :

| Source | Depot AI-HUB | Contenu | Licence |
|--------|-------------|---------|---------|
| superpowers | `09-AGENT-SKILLS/repos/superpowers` | Skills multi-agent, TDD, plans | MIT |
| ECC | `09-AGENT-SKILLS/repos/ECC` | Agents cyberscurite Claude | MIT |
| arckit | `09-AGENT-SKILLS/repos/arckit` | Architecture governance toolkit | Apache-2.0 |
| reflect-system | `09-AGENT-SKILLS/repos/claude-reflect-system` | Auto-apprentissage Claude | MIT |
| nas-agents | `09-AGENT-SKILLS/repos/nas-migration/` | Agents migres du NAS | Varie |

Les contenus sont adaptes (format, conventions, schemas) mais le texte substantiel et la logique sont preserves avec attribution.

---

## Conventions de code / Coding Conventions

### TypeScript strict
- `strict: true` dans tsconfig.json — pas de `any` implicite
- Schemas Zod pour la validation d'entrees (cote serveur et client)
- Types explicites pour tous les parametres et retours de fonctions

### Immutabilite
- Toujours creer de nouveaux objets, jamais muter les existants
- Utiliser le spread operator (`{...obj, field: value}`) pour les mises a jour
- Preferer `const` et les fonctions pures

### Gestion d'erreurs
- try/catch autour de chaque operation risky
- Messages d'erreur orientes utilisateur dans le code UI
- Contexte detaille dans les logs serveur
- Ne jamais avaler les erreurs silencieusement

### Pas de console.log en production
- Utiliser une bibliotheque de logging structure
- Les hooks pre-write detectent les `console.log` dans les fichiers modifies

### Validation d'entrees
- Zod pour la validation aux frontieres du systeme (API, formulaires, config)
- Fail-fast avec messages clairs
- Ne jamais faire confiance aux donnees externes

---

## Compatibilite multi-plateforme / Multi-platform Compatibility

Le convertisseur (`scripts/converter.py`) lit les sources `.claude/` et genere :

| Plateforme | Fichier genere | Format |
|------------|---------------|--------|
| Claude Code | `.claude-plugin/plugin.json` | JSON (natif) |
| Codex CLI | `.codex-plugin/plugin.json` | JSON (simplifie) |
| Cursor | `.cursor-plugin/plugin.json` | JSON (reference .claude/) |
| Gemini CLI | `GEMINI.md` | Markdown |
| OpenCode | `.opencode/plugins/agent-toolkit.js` | JS module |

Regles de conversion :
- Les champs specifiques a Claude (hook_format, tool_name) sont filtres
- Les chemins `.claude/` sont remplaces par les chemins propres a chaque plateforme
- Les schemas Zod sont convertis en JSON Schema pour les plateformes non-TS
- Les scripts shell des hooks sont preserves (compatibles POSIX)

---

## Tests / Testing

### Couverture minimale : 80%

| Type | Framework | Cible |
|------|-----------|-------|
| Unitaire | Vitest | Fonctions pures, utilitaires, schemas Zod |
| Integration | Vitest + React Testing Library | Composants React, pages Next.js |
| E2E | Playwright | Flux critiques (catalogue, installation, conversion) |

### Regles
- Toujours executer les tests avant de merger
- Tests en echec = pas de merge
- Schema Zod valide chaque entree/sortie de l'API catalogue
- Les tests E2E couvrent au minimum : navigation catalogue, selection skill, generation manifeste

---

## Workflow Git

### Commits conventionnels
```
<type>: <description>

<optional body>
```

Types : `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

### Pas de co-auteur
Le parametre de co-auteur est desactive dans les settings projet. Les commits sont attribues uniquement a l'auteur reel.

### Branches
- `main` : production-ready, toujours vert
- `feat/<nom>` : nouvelles fonctionnalites
- `fix/<nom>` : corrections de bugs
- `refactor/<nom>` : refactoring

---

## Structure des agents / Agents Structure

Chaque agent reside dans `.claude/agents/<nom>.md` avec frontmatter YAML :

```yaml
---
name: architect
description: Strategic architecture advisor...
tools: ["Read", "Grep", "Glob"]
model: opus
effort: high
---
```

13 agents disponibles : architect, brainstorming, build-error-resolver, code-reviewer, doc-updater, planner, refactor-cleaner, security-reviewer, systematic-debugging, tdd-guide, typescript-reviewer, verification-before-completion, writing-plans.

---

## Structure des skills / Skills Structure

Chaque skill reside dans `.claude/skills/<nom>/SKILL.md` avec frontmatter YAML :

```yaml
---
name: test-driven-development
description: Use when implementing any feature or bugfix...
origin: superpowers
---
```

29 skills disponibles : agent-eval, api-design, architecture-decision-records, backend-patterns, brainstorming, codebase-onboarding, context-budget, continuous-learning-v2, executing-plans, finishing-a-development-branch, frontend-a11y, frontend-design-direction, frontend-patterns, react-patterns, react-performance, react-testing, receiving-code-review, reflect, requesting-code-review, security-review, subagent-driven-development, systematic-debugging, tdd-workflow, test-driven-development, using-git-worktrees, verification-before-completion, web-security-essentials, writing-plans, writing-skills.

---

## Structure des commandes / Commands Structure

Chaque commande reside dans `.claude/commands/<nom>.md` avec frontmatter YAML :

```yaml
---
description: Create an implementation plan for a task
argument-hint: "[task-description]"
---
```

8 commandes disponibles : build-fix, code-review, learn, plan, quality-gate, reflect, security-scan, tdd.

---

## Regles / Rules Structure

9 regles reparties en 4 domaines :

| Domaine | Regles |
|---------|--------|
| python | securite, testing |
| react | patterns, securite, testing |
| typescript | patterns, securite |
| web | performance, securite |

---

## Hooks / Hooks Systeme

Quatre hooks sont configures dans `.claude/hooks/hooks.json` :

| Hook | Evenement | Script | Action |
|------|-----------|--------|--------|
| session-start | SessionStart | session-start.sh | Message d'accueil, decompte agents/skills |
| pre-bash | PreToolUse (Bash) | pre-bash.sh | Bloquer les commandes dangereuses |
| pre-write | PreToolUse (Write/Edit) | pre-write.sh | Avertir sur les fichiers proteges |
| session-learn | Stop | session-learn.sh | Extraire les learnings en fin de session |

---

## Regles d'organisation / Organization Rules

| Type | Destination |
|------|-------------|
| Agents | `.claude/agents/<nom>.md` |
| Skills | `.claude/skills/<nom>/SKILL.md` |
| Commands | `.claude/commands/<nom>.md` |
| Rules | `.claude/rules/<domaine>/<sujet>.md` |
| Hooks | `.claude/hooks/` |
| Scripts | `scripts/` |
| Tests | `tests/` |
| Catalogue app | `src/` |
| Gouvernance | `pilot/` |

### Ne pas modifier
| Fichier | Raison |
|---------|--------|
| `.claude/settings.json` | Configuration projet, modifie uniquement manuellement |
| `package-lock.json` | Genere automatiquement |
| `.next/` | Build artefact |

---

## Historique

### 2026-06-18 — Creation initiale
- Scaffold Next.js 16.2.9 avec TypeScript strict et Tailwind 4
- Structure `.claude/` avec 13 agents, 29 skills, 8 commandes, 9 regles, 4 hooks
- Plugin manifests pour Claude Code, Codex, Cursor, OpenCode
- GEMINI.md pour Gemini CLI
- Catalogue app (squelette)
- Convertisseur multi-plateforme (scripts/converter.py)