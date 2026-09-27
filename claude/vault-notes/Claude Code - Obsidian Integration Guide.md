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
