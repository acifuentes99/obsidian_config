const { getSecitonOrdinalMap, reverseSectionOrdinalMap, getSectionNodeThatBelongsToOrdinal, extractDateFromDateLinkString } = await dc.require("Z. Meta/datacore/utils/datacore.js");

const COLUMNS = [
    {
        id : "Section",
        value : (row) => dc.coerce.link(`[[${row.$file}#${row.$title}|${row.$title}]]`)
    },
    {
        id : "Section",
        value : (row) => dc.coerce.link(`[[${row.$file}#${row.$title}|${row.$file.split(' - ').at(-1).split('.md')[0]}]]`)
    },
    {
        id : "Date",
        value : (row) => dc.coerce.link(`[[${row.dailyNote}]]`)
    }
];

return function ProjectNotes(args) {
    const data = dc.useQuery(`@file and path("B. Note Box/Notes/projectNotes") and connected([[${args.file.$path}]])`);
    let filtered = [];

    for (pageNode of data) {
        const ordinalMap = getSecitonOrdinalMap(pageNode);
        const reverseOrdinalMap = reverseSectionOrdinalMap(ordinalMap);
        for (sectionNode of pageNode.$sections) {
            if (sectionNode.$level === 3) {
                sectionNode.dailyNote = getSectionNodeThatBelongsToOrdinal(pageNode, reverseOrdinalMap[sectionNode.$ordinal]).$title;
                sectionNode.dailyNote = extractDateFromDateLinkString(sectionNode.dailyNote);
                filtered.push(sectionNode);
            }
        }
    }

    return <dc.Table rows={filtered} columns={COLUMNS} />;
}
