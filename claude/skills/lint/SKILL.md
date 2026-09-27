---
name: lint
description: Health-check the Obsidian vault wiki layer — find unprocessed Inbox notes, orphan Resources pages, missing cross-links, and topics that deserve their own page. Use when the user runs /lint.
---

# Lint

Periodic health-check of the vault's wiki layer. Run when the user invokes `/lint`.

## 1. Unprocessed Inbox notes

List files in `B. Note Box/Inbox/` that:
- Have a `timestamp` older than 14 days
- Contain no outlinks (`[[`) to `A. PARA Notes/Resources/` pages

These are notes that were captured but never integrated into the wiki. Report them with their timestamp and a one-line description of what they contain.

```bash
find "/home/andrew/Documents/GoogleDrive/Notes/B. Note Box/Inbox" -name "*.md" -mtime +14
```

## 2. Orphan Resources pages

Find `A. PARA Notes/Resources/` pages that have no `## Related` section or an empty one. These are wiki pages with no cross-links — isolated nodes that aren't contributing to the network.

## 3. Resources pages without the `wiki` tag

Pages that have been touched by ingest operations should carry the `wiki` tag in frontmatter. Pages without it may predate the wiki workflow and could benefit from a synthesis pass.

## 4. Topics missing a page

Scan recent daily notes (`A. PARA Notes/Daily/` or `Y. Journal/Daily/`) and Inbox notes for concepts or topics that appear multiple times but have no corresponding Resources page. These are candidates for new wiki pages.

## 5. Stale claims

For Resources pages tagged `wiki`: check whether the `## Sources` list has entries. If a page has no sources, flag it — it may have been created manually and never properly ingested.

**Exception — self-sourcing pages:** the following are never stale by definition:
- Pages tagged `type/note/book` or with a `bookStatus` frontmatter field — the book is the source
- Pages tagged `course` — the course itself is the source; treat type as `type/note/research`

## 6. Experience notes health check

Scan `B. Note Box/Notes/Experiences/` for notes that:
- Are missing `startDate` frontmatter
- Have `status: active` but no `## 💡 Insights` section
- Have `status: active` and a `startDate` older than 90 days with only one Insights entry (may be stale/forgotten)

Report as a small table: note name, startDate, status, insights entry count.

## 7. Report

Output a structured report with five sections:

```
## Lint report — <date>

### Unprocessed Inbox (integrate or discard)
- <filename> (<date>) — <what it contains>

### Orphan Resources (add Related links)
- <filename> — <why it's isolated>

### Missing wiki pages (topics worth creating)
- "<topic>" — mentioned in: <list of notes>

### Stale pages (no sources recorded)
- <filename> — created <date>, no ## Sources

### Experiences health
| Note | startDate | status | issues |
|---|---|---|---|
```

End the report with a suggested priority order: what to tackle first for maximum compounding effect.

## 7. Log the lint run

Log in **two places**:

**Daily note** (`Y. Journal/Daily/YYYY-MM-DD.md`) — append under a `### Lint / Ingest log` subheading (create it if it doesn't exist):

```
### Lint / Ingest log
- [lint] /lint run — <N> unprocessed inbox, <N> orphan Resources, <N> missing pages — priority: <top item>
```

**Session note** — append a bullet:

```
* Ran /lint — <N> unprocessed inbox notes, <N> orphans, <N> missing pages
```

## Notes

- Don't auto-fix. The lint operation is advisory — report findings and let the user decide what to act on.
- After a lint run, the user may ask you to ingest a specific Inbox note (`/ingest`) or to create a missing wiki page. Execute those as separate operations.
