---
tags:
  - type/note/documentation
  - topic/claude
  - purpose/reference
timestamp: 2026-09-26T00:26:12
---

## Obsidian Integration

Claude Code uses this vault (`/home/andrew/Documents/GoogleDrive/Notes`) as persistent memory across sessions — both reading context from it and writing session knowledge back to it.

### Vault location
`/home/andrew/Documents/GoogleDrive/Notes`

### New note placement
All new notes go to `B. Note Box/Inbox/` unless the type has a canonical folder (see below).

---

## Note Taxonomy (`type/note/*`)

Every note gets a `type/note/<subtype>` tag. Default is `type/note/default` until the content settles into a specific type.

| Subtype | Description | Canonical folder |
|---|---|---|
| `default` | Initial type — unprocessed or general note | `B. Note Box/Inbox/` |
| `thoughts` | Personal reflections — life events, feelings, things to review | `B. Note Box/Inbox/` |
| `articlenote` | Article fetched via Obsidian Clipper (e.g. Medium) | `B. Note Box/Inbox/` |
| `book` | Book note — notes ordered by chapter | `B. Note Box/Inbox/` |
| `list` | Any list: links, shopping, interesting things. Use `shopping-list` tag for shopping. | `B. Note Box/Inbox/` |
| `journal` | Journaling | `Y. Journal/` |
| `research` | Notes about learning a topic — links, personal observations, synthesis | `A. PARA Notes/Resources/` |
| `documentation` | How-to guide or technical docs. Claude primarily writes this type. | `A. PARA Notes/Resources/` |
| `contact` | A person. Other notes can link to contacts. | `B. Note Box/Inbox/` |
| `brainstorm` | Lots of unordered ideas — for emptying the mind. Differs from `idea` (less processed). | `B. Note Box/Inbox/` |
| `checklist` | A list of tasks | `B. Note Box/Inbox/` |
| `summary` | Summary of a group of articles, a book, or a set of ideas | `B. Note Box/Inbox/` |
| `idea` | A single, more-processed idea. Differs from brainstorm (one idea, more refined). | `B. Note Box/Inbox/` |
| `session` | A Claude Code session log for a project. See structure below. | `A. PARA Notes/Projects/` |

**Merged / deprecated subtypes:**
- `study` → use `research`
- `links` → use `list`
- `shopping-list` → use `list` + add tag `shopping-list`

---

## Frontmatter schema

```yaml
---
tags:
  - type/note/<subtype>      # required
  - topic/<topic>            # e.g. topic/dev, topic/obsidian, topic/learning
  - purpose/<purpose>        # e.g. purpose/reference, purpose/capture
  - toReview                 # add if the note needs manual review
timestamp: 2026-09-26T00:00:00
---
```

For `session` notes (which are also PARA projects):

```yaml
---
tags:
  - type/note/session
  - type/project
  - topic/dev
  - purpose/reference
timestamp: 2026-09-26T00:00:00
status: active
projectType:
  - dev
---
```

---

## Session notes (`type/note/session`)

Session notes track ongoing Claude Code work on a project. They double as PARA project notes (`type/project`) so they appear in the `C. Dashboards/Main/Projects.md` dashboard.

**Structure:**

```markdown
> [!info] About / Definition links
> **Project folder:** `/path/to/project`
> <2-4 sentences: what the project is. Brief — loaded at session start to orient Claude.>

> [!done]- Done definition
> ### Definition
> *
> ### Actions of done
> *

## Context

<Detailed context Claude needs across sessions: tech stack, architecture decisions, active work threads, key file paths, todos, external links. This section is the long-form complement to the brief About callout.>

## Sessions

### [[YYYY-MM-DD|Ddd DD Month YYYY]]
* <bullet points of what was done, decisions made, files changed>
```

**Rules for Claude when updating session notes:**
1. Read the `[!info] About` callout and `## Context` section at session start to recover project context.
2. At session end (or on notable progress), append a new dated section under `## Sessions`.
3. Keep bullet points concise — decisions and outcomes, not step-by-step narration.
4. Update `## Context` when architecture, active threads, or key facts change. Update the `[!info] About` callout only if the project's core identity changes.
5. Never rewrite or delete past session entries.

**Formatting rules:**
- **Date headers**: always link to the daily note — `### [[YYYY-MM-DD|Ddd DD Month YYYY]]`. Example: `### [[2026-09-26|Sat 26 September 2026]]`. Day abbreviation is 3 letters (Mon, Tue, Wed, Thu, Fri, Sat, Sun).
- **Vault file references**: use Obsidian wiki links — `[[Path/To/File|Display Name]]`, dropping the `.md` extension. Example: `[[C. Dashboards/Main/Projects|Projects]]`.
- **External URLs**: use markdown hyperlinks — `[Display text](url)`. Example: `[Claude Docs](https://docs.anthropic.com)`.
- **Non-vault local paths and shell commands**: inline code.

**Location:** `A. PARA Notes/Projects/<Project Name> - Claude Session.md`

---

## PARA structure

```
A. PARA Notes/
  Projects/     ← active work (type/project)
  Areas/        ← ongoing responsibilities
  Resources/    ← reference material (research, documentation)
  Archive/      ← completed or inactive

B. Note Box/
  Inbox/        ← default landing zone
  Notes/        ← processed notes

C. Dashboards/  ← Datacore/Dataview dashboards

T. Templates/   ← note templates
Y. Journal/     ← daily/weekly journal
Z. Meta/        ← vault internals (datacore components, dv-views)
```

The Projects dashboard (`C. Dashboards/Main/Projects.md`) queries `#type/project` and shows `status: active` notes in the Active section.

---

## Claude behavior

- **On session start:** Check for an existing session note for the current project. Read its `[!info] About` callout for context.
- **On session end / notable progress:** Append a dated section to the session note.
- **New project:** Create `A. PARA Notes/Projects/<Name> - Claude Session.md` with the dual tag (`type/note/session` + `type/project`) so it appears in the dashboard.
- **New reference notes:** Write to `A. PARA Notes/Resources/` with `type/note/documentation` or `type/note/research`.
- **Language:** Note content in the same language as the project context (Spanish for Teddy Hug, English elsewhere). Frontmatter always in English.
