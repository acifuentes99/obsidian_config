---
tags:
  - type/dashboard
filter-tag: "#type/note/contact"
number-results: 50
filter-grade: 1
startdate: ""
enddate: ""
show-archive: false
null-date: false
obsidianUIMode: preview
sticker: emoji//1f4e5
---

```button
name Refresh
type command
action Dataview: Force Refresh All Views and Blocks
```

```dataviewjs
const currentPage = dv.current().file;
const { tableDrawer } = customJS;
const startDate = tableDrawer.parseDate(currentPage.frontmatter["startdate"], dv);
const endDate = tableDrawer.parseDate(currentPage.frontmatter["enddate"], dv);

const filterValuesForInbox = (p) => {
    const hasAtLeastOneTypeTag = p.file.inlinks.values.reduce((accum, curr) =>
        accum && !hasTypeTag(curr.path)
    , true);
    return hasAtLeastOneTypeTag;
}

/* Idea:
 * Si padre no incluye alguno de los tags presentes... entonces,
 * la nota se muestra en el Note Inbox
 */
const hasTypeTag = (path) => {
    let typeTags;
    if (currentPage.frontmatter["filter-grade"] === 0) {
        typeTags = ["#type"];
    }
    else if (currentPage.frontmatter["filter-grade"] === 1) {
        typeTags = ["#type/area","#type/collection","#type/project","#type/resource","#type/dashboard","#type/goal"];
    }
    else {
        typeTags = ["#type/area","#type/project","#type/resource","#type/dashboard","#type/goal"];
    }
    return typeTags.some(x => dv.page(path).file.tags.values.includes(x));
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
const noteFilter = (p) => currentPage.frontmatter["filter-grade"] === 3 ? true : (p.file.inlinks.length === 0 || filterValuesForInbox(p));
const whereClause = (p) => {
    return dateFilter(p);
}

let query = currentPage.frontmatter["filter-tag"];
query = query + ' and -#journal \
and -#dashboard \
and -#type/resource \
and -#type/goal \
and -#type/area \
and -#type/project \
and -#type/collection \
and -#type/dashboard \
and -"template" \
and -"A. PARA Notes" \
and -"T. Templates" \
and -"W. Media" \
and -"X. Plugins" \
and -"Z. Meta"'
if (!currentPage.frontmatter["show-archive"]) {
    query = query + ' and -#archive';
}


let queryResults = dv.pages(query)
    .where(p => whereClause(p))
    .sort(p => tableDrawer.getTimestamp(p, dv), 'desc')
    .limit(currentPage.frontmatter["number-results"]);

let NOTE_INBOX_TABLE = [
    { name : 'File', type : 'linkandtags', code : (f) => f.file.path },
    { name : 'Size', type : 'text', code : (f) => f.file.size },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
];
if (currentPage.frontmatter["show-archive"]) {
    NOTE_INBOX_TABLE.push({ name : 'Archived', type : 'text', code : (f) => f.file.tags.values.includes('#archive') ? '✅' : '❌' });
}

tableDrawer.drawTable(NOTE_INBOX_TABLE, queryResults, {dv:dv,app:this.app,instance:this});
```
