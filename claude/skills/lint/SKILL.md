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

## 6. Report

Output a structured report with four sections:

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
```

End the report with a suggested priority order: what to tackle first for maximum compounding effect.

## Notes

- Don't auto-fix. The lint operation is advisory — report findings and let the user decide what to act on.
- After a lint run, the user may ask you to ingest a specific Inbox note (`/ingest`) or to create a missing wiki page. Execute those as separate operations.
- Log the lint run in the session note: `* Ran /lint — <N> unprocessed inbox notes, <N> orphans, <N> missing pages`
