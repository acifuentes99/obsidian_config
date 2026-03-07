/* EUROTRIP 2025 - First dashboard made with datacore
 * Idea : Use this React component, as a base, for creating everything that
 * would be possible with dataview, to Datacore.
 * Keep in mind, that are some comments. They can be useful in ohter contexts, so
 * maintain them for only this component.
 */
const commons = await dc.require("Z. Meta/datacore/utils/commons.js");
let somestring = '';

const COLUMNS = [
    { id: "link",
      value: (row) => commons.getEmojiPrefix(row, false) + row.link + ' (' + row.$size + ')' },
    { id: "Date",
      value: (row) => commons.getTimestamp(dc, row).toFormat("ccc, LLL d") }
];
//value: (row) => '('+row.timestamp.toFormat("ccc, LLL d")+') '+ getEmojiPrefix(row, false) + row.link + ' (' + row.$size + ')'

// All datacore views should return a React component; in practice, this is going to be
return function EurotripDashboard() {
	const file = dc.useCurrentFile({ debounce: 10000 });
	const query = '@page and supertree(!#journal \
		and !#dashboard \
		and (path("B. Note Box") \
		or path("A. PARA Notes"))) \
		';
	const dvQuery = dc.useQuery(query, {debounce : 5000});
	//const dvQuery = dc.useFullQuery(query, {debounce : 5000});

    /* IDEA : Use note type collection, to have a list of links, to make the dahsboard
     * itself. This will serve, for example, to not create folders to store notes, or
     * to use certain tag to group notes in certain type of group
     */
	const query2 = '@task and childof(connected([[Eurotrip note collection]]))';
	const dvQuery2 = dc.useQuery(query2 , {debounce : 5000});

    /* NOT USED. But... serves as a guide, for making queries with Datacore. This will bring
     * the sections. But it was decided, that I needed a Hierarchy including the files, so the
     * first query its used for this
     */
	const sectionQuery = '@section and supertree(!#journal \
		and !#dashboard \
		and (path("B. Note Box") \
		or path("A. PARA Notes"))) \
		';

    /* A classic Dataview approach for filtering query results. This maybe... its not very
     * efficient. But works very well for Note and Tags by recent, and this Eurotrip
     * Dashboard. Maybe could improve.
     * But the important is, the usage of Array functions and chainning. For example, timestamp
     * its added as a property to each entry, for not using the conversion many times in future 
     * calculations. Also, sorting, groupBy its used.
     */
	const results = dc.useArray(dvQuery, array => array
		.map(result => {
			return {...result,
				timestamp: commons.getTimestamp(dc, result),
				parent: result.$parent,
				link: result.$link}})
		.filter(result => {return !!result?.timestamp})
		.filter(result => result.timestamp > dc.coerce.date("2025-05-23") && result.timestamp < dc.coerce.date("2025-07-10"))
		//.sort((a,b) => a?.timestamp?.toMillis() - b?.timestamp?.toMillis(), "asc")
		.sort(result => result?.timestamp, "desc")
		.groupBy(result => result.timestamp.toFormat("y-WW"))
		.sort(result => result.key, "desc")
		);


        let sections = [];
        let sectionDict = {};
        for (result of results) {
            for (row of result.rows) {
                for (section of row.$sections) {
                    if (section.$ordinal === 0 || !section.$parent.$tags.includes("#type/note/thoughts")) {
                        continue;
                    }
                    const sectionValue = `[[${section.$link.path}#${section.$link.subpath}|${section.$name}]] ( ${section.$level} )`;
                    sections.push(sectionValue);

                    const parent = section.$parent;
                    const parentKey = parent.$name + ' (' + row.timestamp.toFormat("y-WW") + ')';
                    if (!(parentKey in sectionDict)) {
                        sectionDict[parentKey] = { rows: [sectionValue] };
                    }
                    else {
                        sectionDict[parentKey].rows.push(sectionValue);
                    }
                }
            }
        }

        let sectionsIterable = [];
        for (const [key, value] of Object.entries(sectionDict)) {
            sectionsIterable.push({ 'key' : key, 'rows' : value.rows });
        }
        // let sectionGrouped = sections.groupBy(result => result.$parent.$name);

        let sectionsWithoutGrouping = [];
        for (const [key, value] of Object.entries(results)) {
            sectionsWithoutGrouping = sectionsWithoutGrouping.concat(value.rows);
        }
	//const sectionResults = dc.useQuery(sectionQuery);
    // <dc.Link link={i.$file} />

    return <div>
        <ul>
          {dvQuery2.map((i) => (
            <li>
              <dc.Checkbox checked={i.$completed} onChange={() => dc.update(i, { $completed: !i.$completed })} /> <dc.Markdown content={i.$text} /> <a link="" onClick={() => commons.openFileInLine(i)}>{i.$file}</a>
            </li>
          ))}
        </ul><dc.List rows={sectionsIterable} /><p>{somestring}</p>

        <dc.Table rows={results} columns={COLUMNS} paging={50} />

        <ul>
        {sectionsWithoutGrouping.map((i) => (
            <li>
            [[{i.link.path}]]
            </li>
            ))}
        </ul>
    </div>;
}
