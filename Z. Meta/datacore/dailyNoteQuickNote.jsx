const { getSecitonOrdinalMap, getSectionNodeThatBelongsToOrdinal, extractDateFromDateLinkString } = await dc.require("Z. Meta/datacore/utils/datacore.js");

// ── Columns for the existing "connected sections" table ──────────────────────
const COLUMNS = [
    {
        id: "Section",
        value: (row) => dc.coerce.link(`[[${row.$file}#${row.$title}|${row.$title}]]`)
    },
    {
        id: "Project",
        value: (row) => dc.coerce.link(row.$parent?.$frontmatter?.project?.value)
    },
    {
        id: "Date",
        value: (row) => row.dateLink
    }
];

// ── Columns for the new "Daily Notes → H4 under Notes" table ────────────────
const DAILY_NOTES_COLUMNS = [
    {
        id: "Note",
        value: (row) => dc.coerce.link(`[[${row.$file}#${row.$title}|${row.$title}]]`)
    },
    {
        id: "Date",
        value: (row) => row.noteDate
    }
];

// ── Helper: given a page node, return all H4 sections that live
//   strictly inside the first H2 titled "Notes". ──────────────────────────────
function extractNotesH4s(page) {
    const sections = page.$sections ?? [];

    // 1. Find the "Notes" H2
    const notesH2 = sections.find(s => s.$level === 2 && s.$title === "Notes");
    if (!notesH2) return [];

    // 2. Find the next H1 or H2 that closes the "Notes" block
    const closingSection = sections.find(
        s => s.$level <= 2 && s.$ordinal > notesH2.$ordinal
    );
    const endOrdinal = closingSection ? closingSection.$ordinal : Infinity;

    // 3. Collect every H4 that falls between the two boundaries
    return sections.filter(
        s => s.$level === 4
          && s.$ordinal > notesH2.$ordinal
          && s.$ordinal < endOrdinal
    );
}

// ── Helper: pull YYYY-MM-DD out of a file path ───────────────────────────────
function dateFromFilePath(filePath) {
    const match = (filePath ?? "").match(/(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
}

// ════════════════════════════════════════════════════════════════════════════
return function DailyNotes(args) {

    // ── Query 2 (new): all pages — we'll filter to Y. Journal/Daily in JS ────
    // Tip: if your vault is large you can try a Datacore folder filter instead:
    //   dc.useQuery(`@page and $path ~ "Y. Journal/Daily"`)
    const dailyPages = dc.useQuery(`@page and path("Y. Journal/Daily")`);

    let notesSections = [];
    for (const page of dailyPages) {
        const h4s = extractNotesH4s(page);
        if (h4s.length === 0) continue;

        const noteDate = dateFromFilePath(page.$path ?? page.$file ?? "");

        // Stamp date onto each section node so the column renderer can read it
        h4s.forEach(s => { s.noteDate = noteDate; });
        notesSections = notesSections.concat(h4s);
    }

    // Sort newest → oldest
    notesSections.sort((a, b) => (b.noteDate ?? "").localeCompare(a.noteDate ?? ""));

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <>
            <h2>📝 Notes (from Daily Journal)</h2>
            <dc.Table rows={notesSections} columns={DAILY_NOTES_COLUMNS} />
        </>
    );
}
