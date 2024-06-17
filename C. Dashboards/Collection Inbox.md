---
tags:
  - type/dashboard
last-days: 100 days
number-results: 2000
para-note-parent: true
show-archive: false
obsidianUIMode: preview
sticker: emoji//1f4e5
---
[[#Notes not linked]]
[[#Collections]]


## Inbox de colecciones

```dataviewjs
const currentPage = dv.current().file;
const { tableDrawer } = customJS;

const filterValuesForInbox = (p) => {
    const hasAtLeastOneTypeTag = p.file.inlinks.values.reduce((accum, curr) =>
        accum && !hasTypeTag(curr.path)
    , true);
    return hasAtLeastOneTypeTag;
}

const hasTypeTag = (path) => {
    const typeTags = currentPage.frontmatter["para-note-parent"] ?
        ["#type/area","#type/collection","#type/project","#type/resource","#type/dashboard","#type/goal"] :
        ["#type"];
    return typeTags.some(x => dv.page(path).file.tags.values.includes(x));
}

let query = '-#journal \
and #type/collection \
and -"template" \
and -"X-Plugins" \
and -"Z. Meta"'
let queryResults = dv.pages(query)
    .where(p => p.file.inlinks.length === 0 || filterValuesForInbox(p)) //agregar el inlinks.length === 0
    .sort(p => p.file.frontmatter.timestamp, 'desc')
    .limit(currentPage.frontmatter["number-results"]);

    //.where(p => p.file.inlinks.length === 0 || filterValuesForInbox(p)) //agregar el inlinks.length === 0

const NOTE_INBOX_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Inlinks', type : 'text', code : (f) => f.file.inlinks.length },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
];

tableDrawer.drawTable(NOTE_INBOX_TABLE, queryResults, {dv:dv,app:this.app,instance:this});
```

## Colecciones totales

```dataviewjs
const currentPage = dv.current().file;
const { tableDrawer } = customJS;

let query = '#type/collection \
and -"template" \
and -"X-Plugins" \
and -"Z. Meta"'
let queryResults = dv.pages(query)
    .sort(p => p.file.frontmatter.timestamp, 'desc')
    .limit(currentPage.frontmatter["number-results"]);

const COLEECTION_LIST_HEADERS = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Inlinks', type : 'text', code : (f) => f.file.inlinks.length },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
];

tableDrawer.drawTable(COLEECTION_LIST_HEADERS, queryResults, {dv:dv,app:this.app,instance:this});
```

