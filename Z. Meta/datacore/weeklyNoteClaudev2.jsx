const { getSecitonOrdinalMap, getSectionNodeThatBelongsToOrdinal, extractDateFromDateLinkString } = await dc.require("Z. Meta/datacore/utils/datacore.js");

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Given a weekly-note file, return the 7 ISO date strings (Sun → Sat)
 * that make up the week.
 *
 * Convention: the weekly note's frontmatter has a `week` field like
 *   week: "2025-W03"
 * If that's missing we fall back to parsing the filename (same format).
 */
function getWeekDates(file) {
    let isoWeek = file.$frontmatter?.week?.value ?? null;

    if (!isoWeek) {
        // try to parse from filename: "2025-W03" or "W03-2025", etc.
        const match = (file.$name ?? "").match(/(\d{4})-W(\d{2})/);
        if (match) isoWeek = `${match[1]}-W${match[2]}`;
    }

    if (isoWeek) {
        const [year, week] = isoWeek.split("-W").map(Number);
        // ISO week 1 = week containing the first Thursday of the year
        // We want Sunday as first day → find the Monday of that ISO week,
        // then go one day back to Sunday.
        const jan4 = new Date(year, 0, 4); // Jan 4 is always in week 1
        const dayOfWeek = jan4.getDay() === 0 ? 7 : jan4.getDay(); // Mon=1..Sun=7
        const monday = new Date(jan4);
        monday.setDate(jan4.getDate() + (week - 1) * 7 - (dayOfWeek - 1));

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() - 1); // one day before Monday = Sunday

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(sunday);
            d.setDate(sunday.getDate() + i);
            return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
        });
    }

    // last-resort fallback: current week starting on Sunday
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sunday);
        d.setDate(sunday.getDate() + i);
        return d.toISOString().slice(0, 10);
    });
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SECTION_COLUMNS = [
    {
        // The section heading itself, linking directly to the anchor
        id: "Section",
        value: (row) => {
            if (!row.$file || !row.$title) return null;
            return dc.coerce.link(`[[${row.$file}#${row.$title}|${row.$title}]]`);
        },
    },
    {
        // The note (file) the section lives in
        id: "Note",
        value: (row) => {
            if (!row.$file) return null;
            // Use just the basename (strip path + extension) as display label
            const name = row.$file.split("/").pop()?.replace(/\.md$/, "") ?? row.$file;
            return dc.coerce.link(`[[${row.$file}|${name}]]`);
        },
    },
    {
        // The project the parent note belongs to
        id: "Project",
        value: (row) => {
            const project = row.$parent?.$frontmatter?.project?.value ?? '';
            return dc.coerce.link(project);
        },
    },
];

const CREATED_COLUMNS = [
    {
        id: "Note",
        value: (row) => {
            if (!row.$path || !row.$name) return null;
            return dc.coerce.link(`[[${row.$path}|${row.$name}]]`);
        },
    },
    {
        id: "Project",
        value: (row) => {
            const project = row.$frontmatter?.project?.value ?? '';
            if (project !== '') {
                return dc.coerce.link(project);
            }
            return project;
        },
    },
    {
        // Creation date from the timestamp frontmatter
        id: "Date",
        value: (row) => {
            const ts = row.$frontmatter?.timestamp?.value;
            if (!ts) return null;
            const d = new Date(ts);
            return isNaN(d) ? null : d.toISOString().slice(0, 10);
        },
    },
];

// ─── styles ──────────────────────────────────────────────────────────────────

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "0.5rem 0",
        fontFamily: "var(--font-interface)",
    },
    dayBlock: {
        borderLeft: "3px solid var(--color-accent)",
        paddingLeft: "1rem",
    },
    dayHeader: {
        display: "flex",
        alignItems: "baseline",
        gap: "0.6rem",
        marginBottom: "0.4rem",
    },
    dayName: {
        fontSize: "1rem",
        fontWeight: 700,
        color: "var(--text-normal)",
        margin: 0,
    },
    dateLabel: {
        fontSize: "0.78rem",
        color: "var(--text-muted)",
    },
    emptyMsg: {
        fontSize: "0.8rem",
        color: "var(--text-faint)",
        fontStyle: "italic",
        padding: "0.2rem 0",
    },
    subheading: {
        fontSize: "0.72rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--text-muted)",
        margin: "0.75rem 0 0.25rem",
    },
    dailyLink: {
        fontSize: "0.78rem",
        color: "var(--text-accent)",
        textDecoration: "none",
        cursor: "pointer",
    },
    isToday: {
        borderLeft: "3px solid var(--color-accent-2, var(--interactive-accent))",
        background: "var(--background-secondary-alt)",
        borderRadius: "0 6px 6px 0",
        paddingRight: "0.5rem",
    },
};

// ─── component ───────────────────────────────────────────────────────────────

return function WeeklyNotes({ filepath, file }) {
    const weekDates = getWeekDates(file);

    const today = new Date().toISOString().slice(0, 10);

    const allRows = [];

    for (const date of weekDates) {
        const dailyPath = `Y. Journal/Daily/${date}`;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = dc.useQuery(`@section and connected([[${dailyPath}]])`);

        // Files created on this date via the `timestamp` frontmatter field.
        // The daily note itself (Y. Journal/Daily/YYYY-MM-DD.md) is excluded
        // since it's already surfaced as the clickable link in the day header.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const createdPages = dc.useQuery(`@page and timestamp`).filter((page) => {
            const ts = page.$frontmatter?.timestamp?.value;
            if (!ts) return false;
            const d = new Date(ts);
            if (isNaN(d)) return false;
            if (d.toISOString().slice(0, 10) !== date) return false;
            return page.$path !== `Y. Journal/Daily/${date}.md`;
        });

        const dayRows = [];
        for (const sectionNode of data) {
            const parentNode = sectionNode.$parent;
            const ordinalMap = getSecitonOrdinalMap(parentNode);

            for (const key in ordinalMap) {
                if (Number(key) === sectionNode.$ordinal) {
                    const filteredSections = parentNode.$sections.filter((s) =>
                        ordinalMap[key].includes(s.$ordinal)
                    );
                    filteredSections.forEach((s) => (s._date = date));
                    dayRows.push(...filteredSections);
                }
            }
        }
        allRows.push({ date, rows: dayRows, createdPages });
    }

    return (
        <div style={styles.wrapper}>
            {allRows.map(({ date, rows, createdPages }, idx) => {
                const isToday = date === today;
                const dayStyle = {
                    ...styles.dayBlock,
                    ...(isToday ? styles.isToday : {}),
                };
                const dailyPath = `Y. Journal/Daily/${date}`;

                return (
                    <div key={date} style={dayStyle}>
                        <div style={styles.dayHeader}>
                            <span style={styles.dayName}>{DAY_NAMES[idx]}</span>
                            <span style={styles.dateLabel}><dc.Link link={dailyPath} style={styles.dailyLink} /></span>

                            {isToday && (
                                <span
                                    style={{
                                        fontSize: "0.68rem",
                                        background: "var(--interactive-accent)",
                                        color: "var(--text-on-accent)",
                                        borderRadius: "4px",
                                        padding: "1px 6px",
                                        fontWeight: 600,
                                    }}
                                >
                                    today
                                </span>
                            )}
                        </div>

                        {/* ── Linked sections ── */}
                        {rows.length > 0 && (
                            <>
                                <div style={styles.subheading}>Linked Notes</div>
                                <dc.Table rows={rows} columns={SECTION_COLUMNS} />
                            </>
                        )}

                        {/* ── Created files ── */}
                        {createdPages.length > 0 && (
                            <>
                                <div style={styles.subheading}>Created</div>
                                <dc.Table rows={createdPages} columns={CREATED_COLUMNS} />
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
