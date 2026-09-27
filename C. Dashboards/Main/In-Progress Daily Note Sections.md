---
tags:
  - type/note/default
  - topic/default
  - purpose/default
obsidianUIMode: preview
cssclasses: no-hover
cssclass: no-hover
---

# 🚧 In-Progress Daily Note Sections

Every `h3` / `h4` heading (inside an `h2`) in a daily note that is tagged
**`#inprogress`**, grouped by the week it was written. Click a **Section** to jump
to that exact heading; click a **Date** to open the daily note. The **Preview**
column embeds the section content inline.

```datacorejsx
// ── Helpers ──────────────────────────────────────────────────────────────────

// Pull a YYYY-MM-DD out of a daily-note path / name.
const dateFromPath = (path) => {
    const m = (path ?? "").match(/(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
};

// Turn an ISO week key ("2026-33") into a readable label with its date range,
// e.g. "2026-33 (Aug 09 - Aug 15)".
const getWeekStringByWeek = (weekKey) => {
    const monday = dc.luxon.DateTime.fromFormat(weekKey, "kkkk-WW");
    const sunday = monday.minus({ days: 1 });
    const saturday = sunday.plus({ days: 6 });
    const range = `${sunday.toFormat("LLL dd")} - ${saturday.toFormat("LLL dd")}`;
    return `${weekKey} (${range})`;
};

// From a daily-note page, return every h3/h4 that sits inside an h2.
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

// The single tag this dashboard is locked to.
const FILTER_TAG = "inprogress";

// Remove the #inprogress tag from one specific section (h3/h4) inside its daily
// note. Locates the heading by level + exact title, then strips the tag from
// every line of that section (heading line + body, up to the next heading of
// the same-or-higher level). The list re-indexes and drops the row afterwards.
const removeInProgressTag = async (row) => {
    const file = app.vault.getAbstractFileByPath(row.file);
    if (!file) {
        if (typeof Notice !== "undefined") new Notice(`Not found: ${row.file}`);
        return;
    }

    const edit = (content) => {
        const lines = content.split("\n");

        // Find the heading line: same level, exact title match.
        let head = -1;
        for (let i = 0; i < lines.length; i++) {
            const m = lines[i].match(/^(#{1,6})\s+(.*?)\s*$/);
            if (m && m[1].length === row.level && m[2] === row.title) {
                head = i;
                break;
            }
        }
        if (head === -1) return content; // heading gone/edited — leave as-is.

        // Section ends at the next heading of same-or-higher level.
        let end = lines.length;
        for (let i = head + 1; i < lines.length; i++) {
            const m = lines[i].match(/^(#{1,6})\s+/);
            if (m && m[1].length <= row.level) {
                end = i;
                break;
            }
        }

        // Strip the exact #inprogress tag (not #inprogress/sub or #inprogressX).
        for (let i = head; i < end; i++) {
            lines[i] = lines[i]
                .replace(/[ \t]*#inprogress(?![\w/-])/gi, "")
                .replace(/[ \t]+$/, "");
        }
        return lines.join("\n");
    };

    if (app.vault.process) {
        await app.vault.process(file, edit);
    } else {
        const content = await app.vault.read(file);
        await app.vault.modify(file, edit(content));
    }
    if (typeof Notice !== "undefined") new Notice(`Removed #inprogress from “${row.title}”`);
};

// Render week grouping headers as-is (they are already descriptive strings).
const WEEK_GROUPING = { render: (key) => key };

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = {
    count: {
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        margin: "0 0 0.6rem 0",
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
    },
};

// ── Columns ──────────────────────────────────────────────────────────────────
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
        // Wrap the pills in a single element — a bare array is treated as a
        // literal and prints raw VNodes.
        render: (_value, row) =>
            row.tags.length === 0 ? (
                ""
            ) : (
                <span style={styles.pillWrap}>
                    {row.tags.map((t) => (
                        <span key={t} style={styles.pill}>
                            {t}
                        </span>
                    ))}
                </span>
            ),
    },
    {
        id: "Date",
        // A wikilink to the file -> clicking opens the daily note.
        value: (row) =>
            dc.coerce.link(`[[${row.file}|${row.date.toFormat("cccc, LLL dd yyyy")}]]`),
        width: "minimum",
    },
    {
        id: "Preview",
        // Plain value (keeps sorting sane); the real output comes from render.
        value: (row) => row.title,
        width: "40%",
        // Native embed of the section, e.g. ![[Y. Journal/Daily/2026-08-18#Prompt copilot]],
        // plus a floating button in the cell's top-right corner that removes the
        // #inprogress tag from that section.
        render: (_value, row) => (
            <div className="dnsw-preview">
                <button
                    className="dnsw-remove-btn"
                    title="Mark done — remove #inprogress from this section"
                    aria-label="Remove #inprogress from this section"
                    onClick={() => removeInProgressTag(row)}
                >
                    ✓
                </button>
                <dc.Markdown content={`![[${row.file}#${row.title}]]`} />
            </div>
        ),
    },
];

return function View() {
    const dailyPages = dc.useQuery(`@page and path("Y. Journal/Daily")`, { debounce: 2500 });

    const rows = dc.useArray(dailyPages, (arr) =>
        arr
            .flatMap((page) => {
                const dateStr = dateFromPath(page.$path ?? page.$name);
                const date = dateStr ? dc.coerce.date(dateStr) : null;
                if (!date) return [];
                return extractHeadingsUnderH2(page).map(({ section, h2 }) => ({
                    file: section.$file,
                    title: section.$title,
                    level: section.$level,
                    h2,
                    date,
                    tags: section.$tags ?? [],
                }));
            })
            // Only sections tagged #inprogress.
            .filter((r) => r.tags.map(normTag).some((rt) => rt === FILTER_TAG))
            // Newest first, then bucket into weeks (also newest first).
            .sort((r) => r.date, "desc")
            .groupBy((r) => getWeekStringByWeek(r.date.toFormat("kkkk-WW")))
            .sort((g) => g.key, "desc")
    );

    const total = rows.reduce((n, g) => n + g.rows.length, 0);

    return (
        <div className="dnsw-inprogress">
            <style>{`
                /* Keep the Under (2nd) and Date (4th) columns on a single line
                   so rows don't grow tall. Preview (last) is allowed to expand. */
                .dnsw-inprogress td:nth-child(2),
                .dnsw-inprogress th:nth-child(2),
                .dnsw-inprogress td:nth-child(4),
                .dnsw-inprogress th:nth-child(4) { white-space: nowrap; }

                /* Cap the Preview (last) column height and scroll if it overflows. */
                .dnsw-inprogress td:last-child {
                    max-height: 300px;
                    overflow-y: auto;
                    display: block;
                }

                /* Floating "remove #inprogress" button, pinned to the top-right
                   corner of the Preview cell (stays visible while it scrolls). */
                .dnsw-inprogress .dnsw-remove-btn {
                    position: sticky;
                    top: 2px;
                    float: right;
                    z-index: 3;
                    margin: 0 0 2px 6px;
                    width: 22px;
                    height: 22px;
                    padding: 0;
                    line-height: 1;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    border: 1px solid var(--background-modifier-border);
                    background: var(--background-primary);
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 0.8rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
                    opacity: 0.85;
                    transition: background 0.12s ease, color 0.12s ease, opacity 0.12s ease;
                }
                .dnsw-inprogress .dnsw-remove-btn:hover {
                    color: var(--text-on-accent);
                    background: var(--interactive-accent);
                    border-color: var(--interactive-accent);
                    opacity: 1;
                }
            `}</style>
            <div style={styles.count}>{total} in-progress entries</div>
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
