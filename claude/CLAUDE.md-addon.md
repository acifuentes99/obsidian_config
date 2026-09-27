## Obsidian integration

Vault: `/home/andrew/Documents/GoogleDrive/Notes`
Full integration guide: `B. Note Box/Notes/Claude Skills Extension.md`

### Session tracking (do this every session)

Each project I help with has a session note at:
`A. PARA Notes/Projects/<Project Name> - Claude Session.md`

These are dual-tagged `type/note/session` + `type/project` so they appear in the Projects dashboard.

**On session start:** Read the note's `> [!info] About / Definition links` callout, and `## Context` section to recover project context.
**During/end of session:** Append a dated section under `## Sessions` with concise bullet points — decisions, outcomes, files changed.
**New project:** Create the session note using the template in the integration guide.

**Formatting rules for session notes:**
- Date headers: `### [[YYYY-MM-DD|Ddd DD Month YYYY]]` — links to the daily note. Example: `### [[2026-09-26|Sat 26 September 2026]]`.
- Vault file references: `[[Path/To/File|Display Name]]` (no `.md`). Example: `[[C. Dashboards/Main/Projects|Projects]]`.
- Non-vault paths (local disk, shell configs, URLs): keep as inline code.
