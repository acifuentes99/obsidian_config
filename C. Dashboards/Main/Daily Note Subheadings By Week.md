---
tags:
  - type/note/default
  - topic/default
  - purpose/default
obsidianUIMode: preview
cssclasses: no-hover
cssclass: no-hover
---

# 🗂️ Daily Note Subheadings by Week

Every `h3` / `h4` heading that lives inside an `h2` in a daily note, grouped by the
week it was written. Click a **Section** to jump to that exact heading; click a
**Date** to open the daily note. The **Tags** column shows the inline tags in each
section — click a tag pill (or type in the box at the top) to filter. You can enter
multiple tags separated by spaces or commas to narrow the results (matches all).
The **Size** column shows the section's length in non-empty lines (the heading line
itself is not counted).

```datacorejsx
const Calendar = await dc.require("Z. Meta/datacore/calendar.jsx");

// ── Helpers ──────────────────────────────────────────────────────────────────

// Pull a YYYY-MM-DD out of a daily-note path / name.
const dateFromPath = (path) => {
    const m = (path ?? "").match(/(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
};

// Turn an ISO week key ("2026-33") into a readable label with its date range,
// e.g. "2026-33 (Aug 09 - Aug 15)". (Same approach as the recent-notes dashboard.)
const getWeekStringByWeek = (weekKey) => {
    const monday = dc.luxon.DateTime.fromFormat(weekKey, "kkkk-WW");
    const sunday = monday.minus({ days: 1 });
    const saturday = sunday.plus({ days: 6 });
    const range = `${sunday.toFormat("LLL dd")} - ${saturday.toFormat("LLL dd")}`;
    return `${weekKey} (${range})`;
};

// From a daily-note page, return every h3/h4 that sits inside an h2.
// We walk the sections in document order, remembering the enclosing h2. A new
// h1/h2 closes the current h2 context, so an h3/h4 only counts while the most
// recent top-level heading was an h2.
const extractHeadingsUnderH2 = (page) => {
    const sections = (page.$sections ?? [])
        .slice()
        .sort((a, b) => a.$ordinal - b.$ordinal);

    const out = [];
    let currentH2 = null;
    for (const s of sections) {
        if (s.$level <= 2) {
            currentH2 = s.$level === 2 ? s : null;
            continue;
        }
        if ((s.$level === 3 || s.$level === 4) && currentH2) {
            out.push({ section: s, h2: currentH2.$title });
        }
    }
    return out;
};

// Normalize a tag for comparison: drop a leading '#' and lower-case it.
const normTag = (t) => (t ?? "").replace(/^#/, "").toLowerCase();

// Count the non-empty lines of a section's body, excluding the heading line
// itself. `lines` is the full file split on newlines; returns null if we don't
// have the file content yet.
const nonEmptyLineCount = (section, lines) => {
    if (!lines) return null;
    const { start, end } = section.$position ?? {};
    if (start == null || end == null) return null;
    let count = 0;
    for (let i = start + 1; i < end && i < lines.length; i++) {
        if ((lines[i] ?? "").trim().length > 0) count++;
    }
    return count;
};

// Render week grouping headers as-is (they are already descriptive strings).
const WEEK_GROUPING = { render: (key) => key };

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = {
    filterBar: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        margin: "0 0 0.75rem 0",
    },
    input: {
        flex: 1,
        padding: "0.4rem 0.6rem",
        borderRadius: "6px",
        border: "1px solid var(--background-modifier-border)",
        background: "var(--background-primary)",
        color: "var(--text-normal)",
        fontFamily: "var(--font-interface)",
        fontSize: "0.85rem",
    },
    count: {
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        whiteSpace: "nowrap",
    },
    pillWrap: {
        display: "flex",
        flexWrap: "wrap",
        gap: "3px",
    },
    pill: {
        display: "inline-block",
        margin: "1px 3px 1px 0",
        padding: "0px 7px",
        borderRadius: "10px",
        background: "var(--background-secondary-alt)",
        color: "var(--text-accent)",
        fontSize: "0.72rem",
        cursor: "pointer",
    },
};

return function View() {
    const dailyPages = dc.useQuery(`@page and path("Y. Journal/Daily")`, { debounce: 2500 });
    const [filter, setFilter] = dc.useState("");

    // Load raw file contents (path -> array of lines) so we can measure section
    // size in non-empty lines. Sections don't expose their text, so we read the
    // files through Obsidian's vault API.
    const [contents, setContents] = dc.useState({});
    dc.useEffect(() => {
        let cancelled = false;
        (async () => {
            const map = {};
            for (const page of dailyPages) {
                const path = page.$path;
                if (!path) continue;
                const f = app.vault.getAbstractFileByPath(path);
                if (!f) continue;
                try {
                    map[path] = (await app.vault.cachedRead(f)).split("\n");
                } catch (e) {
                    /* ignore unreadable files */
                }
            }
            if (!cancelled) setContents(map);
        })();
        return () => {
            cancelled = true;
        };
    }, [dailyPages]);

    // Split the search box into individual tag tokens (space or comma separated).
    const tokens = filter
        .split(/[,\s]+/)
        .map(normTag)
        .filter((t) => t.length > 0);

    // ── Calendar entries: flat sections reusing dailyPages, respects tag filter ─
    // No `contents` dependency — size is only needed for the table below.
    const calEntries = dc.useArray(
        dailyPages,
        (arr) =>
            arr
                .flatMap((page) => {
                    const dateStr = dateFromPath(page.$path ?? page.$name);
                    const date = dateStr ? dc.coerce.date(dateStr) : null;
                    if (!date) return [];
                    return extractHeadingsUnderH2(page).map(({ section }) => ({
                        date,
                        file: section.$file,
                        title: section.$title,
                        tags: section.$tags ?? [],
                    }));
                })
                .filter((r) => {
                    if (tokens.length === 0) return true;
                    const rowTags = r.tags.map(normTag);
                    return tokens.every((tok) => rowTags.some((rt) => rt.includes(tok)));
                }),
        [tokens.join(",")]
    );

    // ── Columns ──────────────────────────────────────────────────────────────
    // Defined inside View so the Tags renderer can push clicks into the filter.
    const COLUMNS = [
        {
            id: "Section",
            // A wikilink to the heading -> clicking navigates to that exact section.
            value: (row) => dc.coerce.link(`[[${row.file}#${row.title}|${row.title}]]`),
        },
        {
            id: "Under",
            value: (row) => row.h2,
            width: "minimum",
        },
        {
            id: "Tags",
            value: (row) => row.tags.join(" "),
            // Render each tag as a clickable pill; clicking filters by that tag.
            // NOTE: wrap the pills in a single element — returning a bare array
            // makes Datacore treat it as a literal and print raw VNodes.
            render: (_value, row) =>
                row.tags.length === 0 ? (
                    ""
                ) : (
                    <span style={styles.pillWrap}>
                        {row.tags.map((t) => (
                            <span
                                key={t}
                                style={styles.pill}
                                onClick={() => setFilter(normTag(t))}
                            >
                                {t}
                            </span>
                        ))}
                    </span>
                ),
        },
        {
            id: "Size",
            // Non-empty line count of the section body (excludes the heading line).
            value: (row) => row.size,
            render: (value) => (value == null ? "…" : `${value} lines`),
            width: "minimum",
        },
        {
            id: "Date",
            // A wikilink to the file -> clicking opens the daily note.
            // Includes the weekday, e.g. "Tuesday, Aug 18 2026".
            value: (row) =>
                dc.coerce.link(`[[${row.file}|${row.date.toFormat("cccc, LLL dd yyyy")}]]`),
            width: "minimum",
        },
    ];

    const rows = dc.useArray(
        dailyPages,
        (arr) =>
            arr
                .flatMap((page) => {
                    const dateStr = dateFromPath(page.$path ?? page.$name);
                    const date = dateStr ? dc.coerce.date(dateStr) : null;
                    if (!date) return [];
                    const lines = contents[page.$path];
                    return extractHeadingsUnderH2(page).map(({ section, h2 }) => ({
                        file: section.$file,
                        title: section.$title,
                        level: section.$level,
                        h2,
                        date,
                        tags: section.$tags ?? [],
                        size: nonEmptyLineCount(section, lines),
                    }));
                })
                // Keep only rows whose tags match EVERY search token (substring match).
                .filter((r) => {
                    if (tokens.length === 0) return true;
                    const rowTags = r.tags.map(normTag);
                    return tokens.every((tok) => rowTags.some((rt) => rt.includes(tok)));
                })
                // Newest first, then bucket into weeks (also newest first).
                .sort((r) => r.date, "desc")
                .groupBy((r) => getWeekStringByWeek(r.date.toFormat("kkkk-WW")))
                .sort((g) => g.key, "desc"),
        [tokens.join(","), contents]
    );

    const total = rows.reduce((n, g) => n + g.rows.length, 0);

    return (
        <div className="dnsw-dash">
            <style>{`
                /* Keep the Under (2nd) and Date (last) columns on a single line
                   so rows don't grow tall. */
                .dnsw-dash td:nth-child(2),
                .dnsw-dash th:nth-child(2),
                .dnsw-dash td:last-child,
                .dnsw-dash th:last-child { white-space: nowrap; }
            `}</style>
            <Calendar
                pages={calEntries}
                getDate={(r) => r.date}
                getFile={(r) => `${r.file}#${r.title}`}
                getLabel={(r) => r.title}
            />
            <div style={{ marginTop: "1.25rem" }} />
            <div style={styles.filterBar}>
                <input
                    style={styles.input}
                    type="text"
                    value={filter}
                    placeholder="Filter by tag(s) — e.g. prompt inprogress (space/comma separated)"
                    onChange={(e) => setFilter(e.target.value)}
                />
                {filter && (
                    <dc.Button onClick={() => setFilter("")}>Clear</dc.Button>
                )}
                <span style={styles.count}>{total} entries</span>
            </div>
            <dc.Table
                class="no-hover"
                rows={rows}
                columns={COLUMNS}
                groupings={WEEK_GROUPING}
                paging={50}
            />
        </div>
    );
};
```
