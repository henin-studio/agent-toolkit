---
name: deep-paper-note
description: Use when deep-reading an academic paper and generating structured Obsidian-style research notes. Handles paper identity resolution, metadata extraction, figure/table placement, mechanism breakdown, and evidence-based analysis.
origin: DeepPaperNote
---

# DeepPaperNote

> Source: DeepPaperNote (v2.0) by 917Dhj | License: MIT | 318 ⭐

Generate high-quality Obsidian-oriented research notes from a single academic paper. **Not a summary generator** — produces structured notes with mechanism breakdowns, key numbers, formulas, and evidence-based analysis.

## When to Activate

- Given a paper title, DOI, arXiv ID, URL, or local PDF path to deep-read
- When the user asks for a structured research note on a paper
- When converting a PDF paper into an Obsidian note with figure context
- When comparing papers and needing structured extraction

## Installation

```bash
# Core dependency (required)
pip install PyMuPDF

# Optional: OCR for scanned PDFs
pip install pytesseract Pillow

# Install skill for Claude Code
# Place SKILL.md in ~/.claude/skills/deep-paper-note/

# Or via npx
npx skills add 917Dhj/DeepPaperNote
```

## Quick Start

### With a Paper Title or DOI

```
/deeppapernote Attention Is All You Need
/deeppapernote https://arxiv.org/abs/1706.03762
/deeppapernote doi:10.5555/3295222.3295349
```

### With a Local PDF

```
/deeppapernote /path/to/paper.pdf
```

### With a Zotero Item

```
/deeppapernote zotero://select/items/ABC123
```

## 16-Stage Pipeline

The skill follows a strict sequential pipeline. **No shortcuts allowed** — each stage must complete before the next begins.

### Stage 1: resolve_paper
Normalize paper identity from title/DOI/URL/arXiv/Zotero. Produce a canonical identifier with confidence level (high/medium/low).

### Stage 2: collect_metadata
Build canonical metadata record from multiple sources (local PDF → Zotero → DOI/CrossRef → arXiv → Semantic Scholar → OpenAlex). Include title, authors, DOI, arXiv, venue, year.

### Stage 3: fetch_pdf
Acquire the best available PDF (local > Zotero > arXiv > DOI redirect).

### Stage 4: extract_source_text
Produce `*_raw_sections.jsonl` and `*_source_manifest.json`. This is the canonical reading material — all later stages cite from here.

### Stage 5: extract_evidence
Build structural indexes and quality signals from the source text. Identify key claims, figures, tables, formulas.

### Stage 6: extract_pdf_assets
Extract page-level PDF image assets with caption-anchored regions.

### Stage 7: plan_figures
Create figure inventory and placeholder plan. Decide per figure/table: `insert`, `placeholder`, `low_priority`, `visual_defect`, `skip`.

### Stage 8: plan_figure_table_decisions
Create a decision row per figure/table with rationale.

### Stage 9: build_synthesis_bundle
Assemble the model-facing manifest (source text + evidence + figure plan + metadata).

### Stage 10: Model Note Planning
Produce an explicit JSON `note_plan` artifact with section structure and grounding references.

### Stage 11: lint_grounding
Validate that the note plan cites valid `section_id` or page ranges. **Fail-closed**: if grounding is insufficient, stop rather than produce a degraded note.

### Stage 12: Model Synthesis
Write the actual note following the 12-section template.

### Stage 13: lint_note
Structure/heading/style check. If `passes_style_gate: false`, fix and rerun.

### Stage 14: final_quality_review
Analytical depth review with 7 quality checks.

### Stage 15: final_readability_review
Language polish pass (not fact invention).

### Stage 16: write_obsidian_note
Save to vault (`DEEPPAPERNOTE_OBSIDIAN_VAULT/Research/Papers/`) or workspace fallback.

## Note Template (12 Sections)

```markdown
---
title: "Paper Title"
authors: [Author1, Author2]
year: 2024
doi: "10.xxxx/xxxxx"
arxiv: "2401.xxxxx"
venue: "Conference/Journal"
tags: [tag1, tag2]
aliases: [Short Title]
date: 2024-01-15
domain: [healthcare, ml, nlp]
---

## 核心信息
## 原文摘要翻译
## 创新点
## 一句话总结
## 研究问题
## 数据与任务定义
## 方法主线
### 机制流程
## 关键结果
## 深度分析
## 局限
## 我的笔记
## 引用
```

## Paper Type Detection

| Type | Key Sections | Mandatory |
|------|-------------|-----------|
| `AI_method` | 机制流程 (mechanism flow) | Yes |
| `benchmark_or_dataset` | 数据集详情, 评估协议 | Dataset details |
| `clinical_or_psychology_empirical` | 研究设计, 统计方法 | Study design |
| `humanities_or_social_science` | 理论框架, 方法论 | Theoretical framework |
| `survey_or_review` | 综述范围, 分类体系 | Taxonomy |

## Configuration

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `DEEPPAPERNOTE_OBSIDIAN_VAULT` | Recommended | (none) | Root path of Obsidian vault |
| `DEEPPAPERNOTE_PAPERS_DIR` | Optional | `Research/Papers` | Vault-relative paper output folder |
| `DEEPPAPERNOTE_OUTPUT_DIR` | Optional | `tmp/DeepPaperNote` | Local temporary artifact directory |
| `DEEPPAPERNOTE_SEMANTIC_SCHOLAR_API_KEY` | Optional | (none) | Enhanced metadata lookup |

## Formula and Math Rules

- Preserve key formulas as LaTeX: `$inline$` and `$$display$$`
- No double-escaping of TeX commands
- No code-block formatting for formulas
- 1-3 essential formulas per technical paper, each followed by an engineering explanation
- Method papers get mandatory `### 机制流程` (3-4 step numbered flow: Input → Operation → Output)

## Figure Handling

- Placeholder-first: plan placeholders before any real image insertion
- Standard `[!figure]` callout format with `建议位置`, `放置原因`, `当前状态`
- Real images: `![[.../images/page_003_img_01.png]]` + italic caption line
- Decision states: `insert`, `placeholder`, `low_priority`, `visual_defect`, `skip`
- Visual quality gates: contamination detection, truncation check, caption-only detection

## Output Language

Default: **Chinese** (only fully supported language). English notes are possible but the template and domain routing are optimized for Chinese.

## Script List

| Script | Purpose |
|--------|---------|
| `scripts/check_environment.py` | Environment diagnostics |
| `scripts/resolve_paper.py` | Paper identity resolution |
| `scripts/collect_metadata.py` | Metadata aggregation |
| `scripts/fetch_pdf.py` | PDF acquisition |
| `scripts/extract_source_text.py` | Raw sections + source manifest |
| `scripts/extract_evidence.py` | Structural indexes + quality signals |
| `scripts/extract_pdf_assets.py` | Page-level image assets |
| `scripts/plan_figures.py` | Figure inventory + placeholder plan |
| `scripts/plan_figure_table_decisions.py` | Decision table per figure/table |
| `scripts/build_synthesis_bundle.py` | Model-facing manifest |
| `scripts/lint_grounding.py` | Validate note plan grounding |
| `scripts/lint_note.py` | Structure/heading/style lint |
| `scripts/materialize_figure_asset.py` | Copy real images into paper-local dir |
| `scripts/write_obsidian_note.py` | Save final note to vault/workspace |
| `scripts/create_input_record.py` | JSON input record from paper identity |

## Quality Checklist

- [ ] Paper identity resolved with high confidence (DOI/arXiv/Zotero)
- [ ] Metadata complete (title, authors, venue, year, DOI)
- [ ] Source text extracted with section IDs
- [ ] Evidence pack references valid section IDs
- [ ] Figure decisions made for every figure/table
- [ ] Note plan passes grounding lint
- [ ] 12-section template followed
- [ ] Mechanism flow present for method papers
- [ ] Key formulas in LaTeX with explanations
- [ ] Deep analysis separates proven from unproven claims
- [ ] Limitations section is honest and specific
- [ ] Note saved to Obsidian vault or workspace

## Focus Areas

- Single-paper deep reading with evidence-based analysis
- Paper type detection and section-adaptive output
- Figure/table placement strategy (placeholder-first)
- Formula preservation with LaTeX
- Obsidian vault integration with domain routing
- Fail-closed pipeline (stop on insufficient evidence)

## Related

- Skill: `ai-coding-agents` — AI coding agent landscape
- Skill: `systematic-debugging` — Debugging methodology
- Skill: `writing-plans` — Plan creation methodology
- Repo: `09-AGENT-SKILLS/repos/DeepPaperNote/` — Full source code