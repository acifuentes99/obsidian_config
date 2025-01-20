---
tags:
  - type/dashboard
number-results: 100
startdate: 2023-07-04
enddate: ""
show-archive: false
null-date: false
show_unlinked_notes: true
show_references: true
weekly-group: true
cssclasses:
  - testclass
obsidianUIMode: preview
sticker: emoji//1f4e5
query: "#type/resource and #book"
---
```button
name Refresh
type command
action Dataview: Force Refresh All Views and Blocks
```
^button-q0fh

```dataviewjs
const currentPage = dv.current().file;
const { tableDrawer } = customJS;
const startDate = tableDrawer.parseDate(currentPage.frontmatter["startdate"], dv);
const endDate = tableDrawer.parseDate(currentPage.frontmatter["enddate"], dv);
const dummyFiles = ["Trailhead Enterprise Patterns", "Ideas cambio de mindset", "El Cuerpo - Una celula de trabajo"];

const filterValuesForInbox = (p) => {
    const hasAtLeastOneTypeTag = p.file.inlinks.values.reduce((accum, curr) =>
        accum && !hasTypeTag(curr.path)
    , true);
    return hasAtLeastOneTypeTag;
}


const filterByDate = (p) => {
    const fileDate = tableDrawer.parseDate(p.file.frontmatter.timestamp, dv);
    return fileDate != '' &&
        (endDate == null || fileDate < endDate) &&
        (startDate == null || fileDate > startDate);
}

const filterByNullDate = (p) => {
    const fileDate = tableDrawer.parseDate(p.file.frontmatter.timestamp, dv);
    return fileDate == null;
}

const dateFilter = currentPage.frontmatter["null-date"] ? filterByNullDate : filterByDate;
const linkedResourcesFilter = (p) => currentPage.frontmatter["show_unlinked_notes"] ? true : p.file.inlinks.length !== 0 ;
const whereClause = (p) => {
    return dateFilter(p) && linkedResourcesFilter(p);
}

const filterGroupBy = (p) => {
    if (Object.hasOwn(p.file.frontmatter, "timestamp")) {
        const dvDate = tableDrawer.parseDate(p.file.frontmatter.timestamp, dv);

        if (currentPage.frontmatter["weekly-group"]) {
            return dvDate ? dvDate.toFormat('y-WW') : null;
        }
        else{
            return dvDate ? dvDate.toISODate() : null;
        }
    }
    return null;
}

let query = '-#journal \
and -#dashboard \
and -"template" \
and -"X-Plugins" \
and -"A. PARA Notes/Projects" \
and -"Z. Meta"'
if (!currentPage.frontmatter["show-archive"]) {
    query = query + ' and -#archive';
}

const queryResults = dv.pages(query)
    .where(p => whereClause(p))
    .sort(p => p.file.frontmatter.timestamp, 'desc')
    .groupBy(p => filterGroupBy(p))
    .limit(currentPage.frontmatter["number-results"])
    .sort(p => p.key, 'desc')
    ;


const getType = (tags) => {
    if (tags.values) {
        return tags.filter(x => x.includes("type/"));
    }
    return null;
}

const getFileNameAndLinkedStatus = (p) => {
    let hasLinks = false;
    if (p.file.inlinks.length > 0) {
        for (let value of p.file.inlinks.values) {
            hasLinks |= !value.path.includes("Y. Journal");
        }
    }
    let l = '';
    if (p.file.tags.includes('#type/project')) {
        l = '✍️';
    }
    else if (p.file.tags.includes('#type/resource')) {
        l = '📚';
    }
    else if (p.file.tags.includes('#type/note/contact')) {
        l = '💁‍♂️';
    }
    else if (p.file.tags.includes('#type/note/checklist')) {
        l = '✔️';
    }
    else if (p.file.tags.includes('#type/note/brainstorm')) {
        l = '🧠';
    }
    else if (p.file.tags.includes('#type/note/documentation')) {
        l = '💡';
    }
    else if (p.file.tags.includes('#type/note/list')) {
        l = '🗒';
    }
    else if (p.file.tags.includes('#type/note/research')) {
        l = '🔍';
    }
    else if (p.file.tags.includes('#type/note/study')) {
        l = '📐';
    }
    else if (p.file.tags.includes('#type/note/summary')) {
        l = '🧾';
    }
    else if (p.file.tags.includes('#type/note/thoughts')) {
        l = '🤔';
    }

    else {
        l = hasLinks ? '✅' : '❌';
    }
    return l + ' ' + '[[' + p.file.path + '|' + p.file.name + ']]';
}

let NOTE_INBOX_TABLE = [
    { name : 'File', type : 'text', code : (f) => getFileNameAndLinkedStatus(f) },
    { name : 'Type', type : 'text', code : (f) => getType(f.file.tags.values) },
];
if (currentPage.frontmatter["weekly-group"]) {
    NOTE_INBOX_TABLE.push({ name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp });
    }


for (const value of queryResults) {
    if (value.key != null) {
        if (currentPage.frontmatter["weekly-group"]) {
            dv.header(3, tableDrawer.parseDate(value.rows[0].file.frontmatter.timestamp, dv).toFormat("y-WW"));
        }
        else{
            dv.header(3, tableDrawer.parseDate(value.rows[0].file.frontmatter.timestamp, dv).toFormat("ccc dd LLL yyyy"));
        }
    }
    else {
        dv.header(3, 'null');
    }
    await tableDrawer.drawTable(NOTE_INBOX_TABLE, value.rows, {dv:dv,app:this.app,instance:this});
}
```
