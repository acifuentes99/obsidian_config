---
tags:
  - type/dashboard
last-days: 100 days
number-results: 200
show-archive: false
obsidianUIMode: preview
sticker: emoji//1f4e5
startdate: 
enddate:
---

## Notes by modified time

```dataview
TABLE file.mday, file.size
From ""
WHERE 
!contains(file.tags, "journal")
AND !contains(file.tags, "archive")
AND !contains(file.tags, "dashboard")
AND !contains(file.tags, "type/resource")
AND !contains(file.tags, "type/goals")
AND !contains(file.tags, "type/area")
AND !contains(file.tags, "type/project")
AND !contains(file.tags, "type/collection")
AND !contains(file.folder, "template")
AND !contains(file.folder, "X-Plugins")
AND file.ctime > (date(today) - dur(this.file.frontmatter.last-days))
SORT file.mtime desc
LIMIT this.file.frontmatter.number-results
```


```dataview
LIST WITHOUT ID "[" + file.name + "]]"
From ""
WHERE (
	(length(file.inlinks) = 0 OR none(filter(file.inlinks, (x) => contains(x.tags, "type/")))))
AND !contains(file.tags, "journal")
AND !contains(file.tags, "archive")
AND !contains(file.tags, "dashboard")
AND !contains(file.tags, "type/resource")
AND !contains(file.tags, "type/goals")
AND !contains(file.tags, "type/area")
AND !contains(file.tags, "type/project")
AND !contains(file.folder, "template")
AND file.ctime > (date(today) - dur(this.file.frontmatter.last-days))
SORT file.mtime desc
LIMIT this.file.frontmatter.number-results
```

```
```dataviewjs
console.error('asdfasdfsa');
const currentFile = dv.current().file;
const showArchive = currentFile.frontmatter["show-archive"] ? '' : 'and -#archive';

const inlinksHasTypeTag = (f) => {
    for (let inlink of f.inlinks.path.array())  {
        if (dv.page(inlink).file.tags.includes('#type')) {
            return true;
        }
    }
    return false;
};
const mainConditions = (p) => p.file.inlinks.length === 0 || !inlinksHasTypeTag(p.file);
const lastDays = (p) => currentFile.frontmatter;

const inboxPages = dv.pages('"Notes" and -#archive and -#type/dashboard and  -"template"' + showArchive)
    .filter(p => mainConditions(p))
    .sort(p => p.file.mtime, 'desc');
let data = {};

let notLinkedResources = new Set();
let linkedResources = new Set();

function showLinksAndDataBySection(page) {
    linkedResources.add(page);
}

for (let page of inboxPages) {
	showLinksAndDataBySection(page)
}


let headers = ["Resource", "CDate"];
let results = dv.array(Array.from(linkedResources)).map(page => [page.file.link, page.file.ctime ]);
dv.header(2, 'Linked Resources');
dv.table(headers, results);
```
```
