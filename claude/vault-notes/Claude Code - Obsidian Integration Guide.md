---
tags:
  - type/note/documentation
  - topic/dev
  - topic/obsidian
  - purpose/reference
timestamp: 2026-09-26T00:00:00
---

# Claude Code – Obsidian Integration Guide

A guide for using Claude Code as a second-brain collaborator with this Obsidian vault.

---

## What this is

Claude Code is configured to treat this vault as persistent memory. At the start of each session it reads the project context; at the end it writes a dated summary back. Over time the vault accumulates a history of decisions, outcomes, and progress — without you having to repeat yourself.

---

## Commands

### `/obsidian-helper`

Activates the Obsidian-aware agent. Use it any time you want Claude to work *inside the vault*: create or edit notes, update session logs, query the PARA structure, or work on Datacore dashboards.

Without this command Claude can still read vault files on request, but won't apply vault conventions automatically (PARA folders, frontmatter schema, session note format).

**When to use it:**
- Creating a new note of any type
- Updating a session log mid-session
- Reorganising notes across PARA folders
- Asking about the taxonomy or structure of the vault

### `/ingest`

Processes a new source into the vault's wiki layer (`A. PARA Notes/Resources/`). The source can be pasted text, a vault file path, or a URL.

Claude reads the source, synthesizes key claims (not a copy), then writes or updates the relevant Resources topic pages — adding cross-links to `## Related` and logging the source in `## Sources`. One source can touch multiple pages.

**When to use it:**
- After clipping an article via Obsidian Web Clipper
- After a learning session you want to compile into a topic page
- When a daily-note subheading has grown enough to deserve a Resources page ("promoting" an idea)

### Daily note log convention

Both `/ingest` and `/lint` write a log entry to the **current day's daily note** under a `### Lint / Ingest log` subheading, in addition to the session note. This keeps an operational trail in the journal alongside the day's other notes.

Format:
```
### Lint / Ingest log
- [lint] /lint run — <N> unprocessed inbox, <N> orphans, <N> missing pages
- [ingest] <source> → [[A. PARA Notes/Resources/<Page>|Page]]
- [wiki] <structural change, e.g. "Added ## Related to X cluster">
- [triage] Inbox: <N> reviewed, <N> integrated, <N> discarded
```

### `/lint`

Periodic health-check of the wiki layer. Reports:
- Inbox notes older than 14 days with no outlinks to Resources (unprocessed)
- Resources pages with no `## Related` or `## Sources` (not yet wiki-maintained)
- Topics mentioned repeatedly across notes without their own Resources page

Advisory only — suggests actions, doesn't make changes.

### `/end`

Ends the Claude Code session. Claude writes (or appends) a dated session entry to the project's session note, then exits.

**What it writes:**
- A `### [[YYYY-MM-DD|Ddd DD Month YYYY]]` header
- Concise bullets: decisions made, outcomes, vault files changed
- Appended to `A. PARA Notes/Projects/<Project Name> - Claude Session.md`

---

## Session notes

Every project has one session note at:

```
A. PARA Notes/Projects/<Project Name> - Claude Session.md
```

These are dual-tagged `type/note/session` + `type/project` so they appear in the [[C. Dashboards/Main/Projects|Projects]] dashboard.

**Structure:**

```markdown
> [!info] About / Definition links
> Project folder: `/path/to/project`
> 2–4 sentences of context loaded at session start.

> [!done]- Done definition
> ### Definition
> * what "done" means for this project
> ### Actions of done
> * concrete milestones

## Context

## Sessions

### [[YYYY-MM-DD|Ddd DD Month YYYY]]
* bullet: decision or outcome
```

**Rules:**
- New sessions are always *appended* — past entries are never edited.
- Bullets cover decisions and outcomes only, not step-by-step narration.
- The `[!info] About` callout is updated only if the project scope changes.

### Creating a session note for a new project

Tell Claude (with `/obsidian-helper` active):

> "Create a session note for project X. Folder is `/path/to/project`. It does Y."

Claude will create the file with the correct frontmatter, callouts, and an initial dated entry.

---

## LLM Wiki layer

`A. PARA Notes/Resources/` doubles as a **compounding wiki** — a structured, interlinked set of topic pages that Claude maintains. The idea: instead of re-deriving knowledge from raw notes every session, Claude compiles it once and keeps it current. Knowledge accumulates rather than scatters.

**Three layers:**

| Layer | Location | Who writes it |
|---|---|---|
| Raw sources | `B. Note Box/Inbox/`, daily notes | You |
| Wiki (compiled knowledge) | `A. PARA Notes/Resources/` | Claude (via `/ingest`) |
| Schema | `CLAUDE.md`, skills | Both |

**Wiki page conventions** — a Resources page is "wiki-maintained" when it has:
- `wiki` tag in frontmatter
- `## Related` section with links to other Resources pages
- `## Sources` section listing what contributed (with dates)

Pages without the `wiki` tag are older reference notes — valid, but not yet part of the compounding layer. They get migrated during `/ingest` when a new source touches them.

---

## Note taxonomy

| Tag | Type | Default folder |
|---|---|---|
| `type/note/default` | Unprocessed / general | `B. Note Box/Inbox/` |
| `type/note/thoughts` | Personal reflections | `B. Note Box/Inbox/` |
| `type/note/research` | Learning notes, links, synthesis | `A. PARA Notes/Resources/` |
| `type/note/documentation` | How-to guides, technical docs | `A. PARA Notes/Resources/` |
| `type/note/session` | Claude Code session log | `A. PARA Notes/Projects/` |
| `type/note/journal` | Journaling | `Y. Journal/` |
| `type/note/idea` | Single refined idea | `B. Note Box/Inbox/` |
| `type/note/brainstorm` | Mind-dump, many unordered ideas | `B. Note Box/Inbox/` |
| `type/note/checklist` | Task list | `B. Note Box/Inbox/` |
| `type/note/summary` | Summary of articles, books, ideas | `B. Note Box/Inbox/` |
| `type/note/list` | Any list (add `shopping-list` tag for shopping) | `B. Note Box/Inbox/` |
| `type/note/book` | Book notes by chapter | `B. Note Box/Inbox/` |
| `type/note/articlenote` | Article clipped via Obsidian Clipper | `B. Note Box/Inbox/` |
| `type/note/contact` | A person — other notes link to this | `B. Note Box/Inbox/` |

---

## Formatting conventions

| Element | Format |
|---|---|
| Date headers in session notes | `### [[YYYY-MM-DD\|Ddd DD Month YYYY]]` |
| Vault file references | `[[Path/To/File\|Display Name]]` (no `.md`) |
| External URLs | `[Display text](url)` |
| Local paths / shell commands | `` `inline code` `` |

---

## Key files

| File | Purpose |
|---|---|
| `~/.claude/CLAUDE.md` | Global Claude Code instructions (dev stack, preferences, Obsidian integration) |
| [[B. Note Box/Notes/Claude Skills Extension\|Claude Skills Extension]] | Internal guide used by Claude — vault structure, session format, active projects |
| [[C. Dashboards/Main/Projects\|Projects dashboard]] | Queries `#type/project` — all session notes appear here |
