---
tags:
  - type/dashboard
obsidianUIMode: preview
cssclasses: no-hover
cssclass: no-hover
sticker: 1f4ac
---
![[Dashboards Navigation]]

```datacorejsx
// ── Helpers ──────────────────────────────────────────────────────────────────

const getTimestamp = (page) => {
    const v = page.$frontmatter?.timestamp?.value;
    if (!v) return null;
    const d = dc.coerce.date(v);
    if (d) return d;
    const s = v.toString();
    return dc.coerce.date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`);
};

const getWeekStringByWeek = (weekKey) => {
    const monday = dc.luxon.DateTime.fromFormat(weekKey, "kkkk-WW");
    const sunday = monday.minus({ days: 1 });
    const range = `${sunday.toFormat("LLL dd")} - ${sunday.plus({ days: 6 }).toFormat("LLL dd")}`;
    return `${weekKey} (${range})`;
};

const normTag = (t) => (t ?? "").replace(/^#/, "").toLowerCase();

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
    filterBar: { display: "flex", alignItems: "center", gap: "0.5rem", margin: "0 0 0.75rem 0" },
    input: {
        flex: 1, padding: "0.4rem 0.6rem", borderRadius: "6px",
        border: "1px solid var(--background-modifier-border)",
        background: "var(--background-primary)", color: "var(--text-normal)",
        fontFamily: "var(--font-interface)", fontSize: "0.85rem",
    },
    count: { fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" },
    pillWrap: { display: "flex", flexWrap: "wrap", gap: "3px" },
    pill: {
        display: "inline-block", padding: "0px 7px", borderRadius: "10px",
        background: "var(--background-secondary-alt)", color: "var(--text-accent)",
        fontSize: "0.72rem", cursor: "pointer",
    },
};

// ── View ──────────────────────────────────────────────────────────────────────

return function View() {
    // ── Notes with #prompt tag ────────────────────────────────────────────────
    const promptPages = dc.useQuery(
        '@page and #prompt'
        + ' and !path("T. Templates")'
        + ' and !path("C. Dashboards")'
        + ' and !path("Y. Journal")'
        + ' and !path(".claude")',
        { debounce: 2500 }
    );

    const noteRows = dc.useMemo(() =>
        [...promptPages]
            .map(p => ({
                link: p.$link,
                timestamp: getTimestamp(p),
                tags: (p.$tags ?? []).filter(t => t !== '#prompt'),
            }))
            .sort((a, b) => (b.timestamp?.valueOf() ?? 0) - (a.timestamp?.valueOf() ?? 0)),
        [promptPages]
    );

    // ── Daily note sections with #prompt tag ──────────────────────────────────
    const dailyPages = dc.useQuery(`@page and path("Y. Journal/Daily")`, { debounce: 2500 });
    const [filter, setFilter] = dc.useState("");

    const tokens = filter.split(/[,\s]+/).map(normTag).filter(Boolean);

    const sectionRows = dc.useArray(
        dailyPages,
        (arr) =>
            arr
                .flatMap((page) => {
                    const dateStr = (page.$path ?? page.$name).match(/(\d{4}-\d{2}-\d{2})/)?.[1];
                    const date = dateStr ? dc.coerce.date(dateStr) : null;
                    if (!date) return [];
                    return (page.$sections ?? [])
                        .filter(s => (s.$tags ?? []).includes('#prompt'))
                        .map(s => ({
                            file: s.$file,
                            title: s.$title,
                            date,
                            tags: (s.$tags ?? []).filter(t => t !== '#prompt'),
                        }));
                })
                .filter(r =>
                    tokens.length === 0 ||
                    tokens.every(tok => r.tags.map(normTag).some(rt => rt.includes(tok)))
                )
                .sort(r => r.date, "desc")
                .groupBy(r => getWeekStringByWeek(r.date.toFormat("kkkk-WW")))
                .sort(g => g.key, "desc"),
        [tokens.join(",")]
    );

    const totalSections = sectionRows.reduce((n, g) => n + g.rows.length, 0);

    // ── Columns ───────────────────────────────────────────────────────────────

    const NOTE_COLS = [
        { id: "Note", value: r => r.link },
        {
            id: "Date",
            value: r => r.timestamp ? r.timestamp.toFormat("LLL dd yyyy") : "—",
            width: "minimum",
        },
        {
            id: "Tags",
            value: r => r.tags.join(" "),
            render: (_v, r) => r.tags.length === 0 ? "" : (
                <span style={styles.pillWrap}>
                    {r.tags.map(t => <span key={t} style={styles.pill}>{t}</span>)}
                </span>
            ),
            width: "minimum",
        },
    ];

    const SECTION_COLS = [
        {
            id: "Section",
            value: r => dc.coerce.link(`[[${r.file}#${r.title}|${r.title}]]`),
        },
        {
            id: "Date",
            value: r => dc.coerce.link(`[[${r.file}|${r.date.toFormat("cccc, LLL dd yyyy")}]]`),
            width: "minimum",
        },
        {
            id: "Tags",
            value: r => r.tags.join(" "),
            render: (_v, r) => r.tags.length === 0 ? "" : (
                <span style={styles.pillWrap}>
                    {r.tags.map(t => (
                        <span key={t} style={styles.pill} onClick={() => setFilter(normTag(t))}>{t}</span>
                    ))}
                </span>
            ),
            width: "minimum",
        },
    ];

    const WEEK_GROUPING = { render: key => key };

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="prompts-dash">
            <style>{`
                .prompts-dash td:nth-child(2), .prompts-dash th:nth-child(2) { white-space: nowrap; }
                .prompts-dash td:nth-child(3), .prompts-dash th:nth-child(3) { white-space: nowrap; }
            `}</style>

            <h2>Notes ({noteRows.length})</h2>
            <dc.Table class="no-hover" rows={noteRows} columns={NOTE_COLS} paging={50} />

            <h2>Daily note sections ({totalSections})</h2>
            <div style={styles.filterBar}>
                <input
                    style={styles.input}
                    placeholder="Filter by tag (e.g. inprogress)..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
                {filter && <dc.Button onClick={() => setFilter("")}>Clear</dc.Button>}
                <span style={styles.count}>{totalSections} sections</span>
            </div>
            <dc.Table class="no-hover" rows={sectionRows} columns={SECTION_COLS} groupings={WEEK_GROUPING} paging={50} />
        </div>
    );
};
```
