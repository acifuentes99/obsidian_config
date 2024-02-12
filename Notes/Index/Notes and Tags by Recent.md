---
tags:
  - type/dashboard
last-days: 100 days
number-results: 2000
startdate: 2023-01-11
enddate: 2023-09-15
show-archive: false
null-date: false
obsidianUIMode: preview
show_unlinked_notes: true
show_references: true
weekly-group: false
cssclasses:
  - testclass
sticker: emoji//1f4e5
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
and -"Z-Meta"'
if (!currentPage.frontmatter["show-archive"]) {
    query = query + ' and -#archive';
}
let queryResults = dv.pages(query)
    .where(p => whereClause(p))
    .sort(p => p.file.frontmatter.timestamp, 'desc')
    .limit(currentPage.frontmatter["number-results"])
    .groupBy(p => filterGroupBy(p))
    .sort(p => p.key, 'desc');

const getType = (tags) => {
    if (tags.values) {
        return tags.filter(x => x.includes("type/"));
    }
    return null;
}

const getFileNameAndLinkedStatus = (p) => {
    const l = p.file.inlinks.length === 0 ? '❌' : '✅';
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
