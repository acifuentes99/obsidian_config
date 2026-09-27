---
name: ingest
description: Ingest a new source into the Obsidian vault wiki — reads the source, integrates key knowledge into Resources topic pages, and logs the ingest in the session note. Use when the user runs /ingest or says "ingest this".
---

# Ingest

Process a new source into the vault's wiki layer (`A. PARA Notes/Resources/`).

## 1. Receive the source

If the user hasn't provided one, ask: "What's the source? You can paste it, give a vault file path, or a URL."

- **Pasted text** → use directly
- **Vault file path** → Read the file
- **URL** → WebFetch to retrieve content

## 2. Extract key information

Read the source and identify:
- Main topic and domain
- Key claims, concepts, entities worth keeping
- Anything that contradicts, extends, or confirms existing vault knowledge
- Tags to use (`topic/`, `purpose/`)

## 3. Find related Resources pages

Search `A. PARA Notes/Resources/` for existing pages on the same topic or related concepts:
- Use `grep` or `find` to locate pages with matching topic keywords
- Read the 1–3 most relevant ones in full

## 4. Write or update topic pages

**If a relevant page exists:** integrate new insights into the appropriate section, update `## Sources`, and add any new cross-links to `## Related`.

**If no page exists** and the topic is substantial enough to accumulate knowledge over time: create a new page using the format below.

**Do not create a page for every source.** Only when a topic is broad enough to deserve a persistent, growing entry.

### Resources wiki page format

```markdown
---
tags:
  - type/note/research
  - topic/<topic>
  - purpose/reference
  - wiki
timestamp: <YYYY-MM-DDT00:00:00>
---

# <Topic Title>

<2-3 sentence summary of what this page covers.>

---

## <Main section>

<Synthesized knowledge — not a copy of the source. Claims, patterns, key ideas.>

## Related

- [[A. PARA Notes/Resources/<Page>|<Display name>]]

## Sources

- <Source title or description> — <date ingested, brief note on what it contributed>
```

The `wiki` tag distinguishes LLM-maintained pages from other resource notes.

## 5. Log the ingest

Append a bullet to the current session note (identify it via the current project context):

```
* Ingested: <source title> → updated [[A. PARA Notes/Resources/<Page>|<Page>]]
```

## Notes

- Synthesize, don't transcribe. The goal is compiled knowledge, not a copy of the source.
- One source can touch multiple pages — update all of them.
- If a source contradicts an existing claim on a Resources page, note the contradiction explicitly under the relevant section rather than silently overwriting.
- Keep `## Sources` as a running list — never delete past entries.
