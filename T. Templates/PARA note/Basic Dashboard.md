## Note Dashboard
```button
name Refresh
type command
action Dataview: Force Refresh All Views and Blocks
```
^button-q0fh

```dataviewjs
const currentPage = dv.current().file;
const { tableDrawer } = customJS;

let query = currentPage.frontmatter.query + ' and -"T. Templates" and -"Z. Meta"';
if (!currentPage.frontmatter["show-archive"]) {
    query = query + ' and -#archive';
}

const queryResults = dv.pages(query)
    .sort(p => p.file.frontmatter.timestamp, 'desc')
    .limit(currentPage.frontmatter["number-results"])
    ;

let NOTE_INBOX_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.name },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
];

await tableDrawer.drawTable(NOTE_INBOX_TABLE, queryResults.values, {dv:dv,app:this.app,instance:this});
```

<%*
const currentFile = app.workspace.getActiveFile();
await app.fileManager.processFrontMatter(currentFile, frontmatter => {
    if (!tp.frontmatter.query) {
        frontmatter['query'] = '#type/resource and #book';
    }
    if (!tp.frontmatter['number-results']) {
        frontmatter['number-results'] = 100;
    }
});
%>
