const { getSecitonOrdinalMap, getSectionNodeThatBelongsToOrdinal, extractDateFromDateLinkString } = await dc.require("Z. Meta/datacore/utils/datacore.js");

const COLUMNS = [
    {
       id : "Section",
        value : (row) => dc.coerce.link(`[[${row.$file}#${row.$title}|${row.$title}]]`)
    },
    {
        id : "Project",
        value : (row) => dc.coerce.link(row.$parent?.$frontmatter?.project?.value)
    },
    {
        id : "Date",
        value : (row) => row.dateLink
    }
];

return function DailyNotes(args) {
    const data = dc.useQuery(`@section and connected([[${args.filepath}]])`);

    let filtered = [];
    for (sectionNode of data) {
        const parentNode = sectionNode.$parent;
        const ordinalMap = getSecitonOrdinalMap(parentNode);

        for (key in ordinalMap) {
            if (key == sectionNode.$ordinal) {
                let filteredSections = parentNode.$sections.filter(section => ordinalMap[key].includes(section.$ordinal))

                // Save date of section
                filteredSections.map(a => a.dateLink = extractDateFromDateLinkString(sectionNode.$title));

                filtered = filtered.concat(filteredSections);
            }
        }
    }

    return <dc.Table rows={filtered} columns={COLUMNS} />;
}

