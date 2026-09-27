---
tags:
  - type/note/default
  - topic/default
  - purpose/default
  - toReview
timestamp: 2025-06-29T06:57:50
showAll: false
noteLimit: 500
obsidianUIMode: preview
cssclasses: no-hover
cssclass: no-hover
---

```datacorejsx
const Calendar = await dc.require("Z. Meta/datacore/calendar.jsx");

let somestring = '';

const getEmojiPrefix = (pFile, hasLinks) => {
        let l = '';
        if (pFile.$tags.includes('#type/project')) {
            l = '🧮🎲';
        }
        else if (pFile.$tags.includes('#type/resource')) {
            l = '🧮📚';
        }
        else if (pFile.$tags.includes('#type/area')) {
            l = '🧮🤩';
        }
        else if (pFile.$tags.includes('#type/note/contact')) {
            l = '💁‍♂️';
        }
        else if (pFile.$tags.includes('#type/note/checklist')) {
            l = '✔️';
        }
        else if (pFile.$tags.includes('#type/note/brainstorm')) {
            l = '🧠';
        }
        else if (pFile.$tags.includes('#type/note/documentation')) {
            l = '💡';
        }
        else if (pFile.$tags.includes('#type/note/list')) {
            l = '🗒';
        }
        else if (pFile.$tags.includes('#type/note/research')) {
            l = '🔍';
        }
        else if (pFile.$tags.includes('#type/note/study')) {
            l = '📐';
        }
        else if (pFile.$tags.includes('#type/note/summary')) {
            l = '🧾';
        }
        else if (pFile.$tags.includes('#type/note/thoughts')) {
            l = '🤔';
        }
        else if (pFile.$tags.includes('#type/note/articlenote')) {
            l = '📝';
        }
        else if (pFile.$tags.includes('#type/note/book')) {
            l = '📗';
        }
        else if (pFile.$tags.includes('#type/note/experience')) {
            l = '🧾';
        }
        else {
            l = '❓';
        }
        //if (pFile.$tags.includes('#type/note')) {
        //if (true) {
        //  l = !!pFile.$parent ? '✅' + l : '❌' + l;
        //}
        return l;
    };

const getTimestamp = (dc, row) => {
	if (!row || !row?.$frontmatter?.timestamp) {
		return null;
	}
	const timestampValue = row.$frontmatter?.timestamp.value;
	if (dc.coerce.date(timestampValue)) {
		return timestampValue;
	}
	let dateString = timestampValue.toString();
	dateString =
		dateString.substring(0,4) + '-' +
		dateString.substring(4,6) + '-' +
		dateString.substring(6,8);
	return dc.coerce.date(dateString);
};
// const COLUMNS = [
//     {
//         id: "link",
//         //value: (row) => '('+row.timestamp.toFormat("ccc, LLL d")+') '+ getEmojiPrefix(row, false) + row.link + ' (' + row.$size + ')'
//         value: (row) => getEmojiPrefix(row, false) + row.link + ' (' + row.$size + ')'
//         },
//     { id: "Date", value: (row) => getTimestamp(dc, row).toFormat("ccc, LLL d") }
// ];

const COLUMNS = [
    {
        id: "link",
        //value: (row) => '('+row.timestamp.toFormat("ccc, LLL d")+') '+ getEmojiPrefix(row, false) + row.link + ' (' + row.$size + ')'
        value: (row) => getEmojiPrefix(row, false) + row.link + ' (' + getTimestamp(dc, row).toFormat("ccc, LLL d")  + ' - ' + row.$size + ')'
        }
];

const getWeekStringByWeek = (weekLuxon) => {
    const weekStr = weekLuxon.toString();
    const monday = dc.luxon.DateTime.fromFormat(weekStr, "kkkk-WW");
    const sunday = monday.minus({ days: 1 });
    const saturday = sunday.plus({ days: 6 });
    const range = `${sunday.toFormat('LLL dd')} - ${saturday.toFormat('LLL dd')}`;
    return weekLuxon + ' (' + range + ')';
};

// All datacore views should return a React component; in practice, this is going to be
return function View() {
	const file = dc.useCurrentFile({ debounce: 10000 });
	const [showAll, setShowAll] = dc.useState(() => !!(file.$frontmatter?.showAll?.value));
	const [noteLimit, setNoteLimit] = dc.useState(() => file.$frontmatter?.noteLimit?.value ?? 1000);

	const applyFrontmatter = () => {
		const tFile = app.vault.getAbstractFileByPath(file.$path);
		if (!tFile) return;
		const meta = app.metadataCache.getFileCache(tFile);
		setNoteLimit(meta?.frontmatter?.noteLimit ?? 1000);
		setShowAll(!!(meta?.frontmatter?.showAll));
	};
	const query = '@page and supertree(!#journal'
		+ ' and !#dashboard'
		+ ' and (path("B. Note Box")'
		+ ' or path("A. PARA Notes")))';
	const dvQuery = dc.useQuery(query, {debounce : 5000});
	//const dvQuery = dc.useFullQuery(query, {debounce : 5000});

	const results = dc.useArray(dvQuery, array => {
		const sorted = array
			.map(result => ({...result,
				timestamp: getTimestamp(dc, result),
				parent: result.$parent,
				link: result.$link}))
			.filter(result => !!result?.timestamp)
			.sort(result => result?.timestamp, "desc");
		return (showAll ? sorted : sorted.limit(noteLimit))
			.groupBy(result => getWeekStringByWeek(result.timestamp.toFormat("y-WW")))
			.sort(result => result.key, "desc");
	}, [showAll, noteLimit]);

	const btnStyle = {
		fontSize: "0.8rem", padding: "0.2rem 0.6rem", borderRadius: "4px", cursor: "pointer",
		border: "1px solid var(--background-modifier-border)",
		background: "var(--background-secondary)", color: "var(--text-normal)",
	};
	return (
		<div>
			<Calendar pages={dvQuery} getDate={(p) => getTimestamp(dc, p)} getFile={(p) => p.$path || ""} getLabel={(p) => p.$name || ""} />
			<p>{somestring}</p>
			<div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.5rem 0" }}>
				<button style={btnStyle} onClick={() => setShowAll(v => !v)}>
					{showAll ? `Apply limit (${noteLimit})` : "Show all notes"}
				</button>
				{!showAll && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>showing {noteLimit} most recent</span>}
				<button style={{ ...btnStyle, marginLeft: "auto" }} onClick={applyFrontmatter}>
					Recalculate
				</button>
			</div>
			<dc.List class="no-hover" type="block" rows={results} renderer={(row) => getEmojiPrefix(row, false) + row.link + ' (' + row.$size + ')'} paging={50} />
		</div>
	);
}
```
