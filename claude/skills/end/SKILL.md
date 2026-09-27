---
name: end
description: End the current Claude Code session — writes a session summary to the Obsidian vault session note, then exits. Use when the user types /end to wrap up.
---

# End session

When invoked, do the following steps in order:

## 1. Identify the session note

The Obsidian vault is at `/home/andrew/Documents/GoogleDrive/Notes`.
Session notes live at `A. PARA Notes/Projects/<Project Name> - Claude Session.md`.

Determine which session note applies to the current conversation:
- If you are working inside the Obsidian vault itself → use `Obsidian Vault - Claude Session.md`
- Otherwise, look for a note whose name matches the project or working directory name

If no session note exists yet, create one using the template from `B. Note Box/Notes/Claude Skills Extension.md`.

## 2. Write the session entry

Append a new dated section under `## Sessions`. Do NOT edit past entries.

Format:
```
### [[YYYY-MM-DD|Ddd DD Month YYYY]]
* <bullet: key decisions and outcomes>
* <bullet: files changed or created, using [[Vault/Path|Display Name]] for vault files>
```

Rules:
- Today's date is provided in the system context (`currentDate`).
- Bullets cover decisions and outcomes only — no step-by-step narration.
- Vault file references use `[[Path/To/File|Display Name]]` (no `.md` extension).
- Non-vault paths stay as inline code.
- Keep it concise: 3–6 bullets is typical.

## 3. Confirm and exit

After writing the note, tell the user the session note has been updated (one line), then output the `/exit` command to close the session.
