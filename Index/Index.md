---
icon: teddy_bear
tags: type/dashboard
---
# 🧸 [[Index]]

**Notes to Order**
* [[Note Inbox]]
* [[Notes non Tagged]]
* [[Notes by Size]]

**Overviews**
* [[Project Overview]]
* [[PARA Notes]]

## 😱 [[Areas]]
* [[Tech]]
* [[Reflexiones]]
* [[Life Knowledge]]
* [[Career]]
* [[Productivity]]
```button
name New Area
type command
action From Template: Area
```

## 📔 [[Projects]]
```dataviewjs
let currentFile = dv.current().file;
let showArchive = currentFile.frontmatter["show-archive"] ? '' : 'and -#archive';
let projectPages = dv.pages('#type/project and -"Ω. Meta/template-notes"' + showArchive);
let data = {};

function showLinksAndDataBySection(page) {

    let pages = new Set();
    for (let outlink of page.file.outlinks.array()) {
        pages.add(outlink.path);
    }
    let key = page.file.name;

    data[key] = dv.array(Array.from(pages)).map(p => dv.page(p)).sort(k => k.file.mtime, 'desc');
}

for (let page of projectPages) {
	showLinksAndDataBySection(page)
}

let headers = ["Project", "Mdate"];
let results = projectPages.sort(k => data[k.file.name][0].file.mtime, 'desc').map(page => [page.file.link, data[page.file.name][0].file.mtime ]);
;
dv.table(headers, results);
```
```button
name New Project
type command
action From Template: Project
```

## 📆 Weekly Notes
```dataview
TABLE last-one as "Last One" FROM #journal/weekly WHERE !contains(file.folder, "template-journal") SORT file.name DESC LIMIT 4
```
```button
name Current Week Note
type command
action Periodic Notes: Open this week's note
color default
``` 
```button
name Current Daily Note
type command
action Periodic Notes: Open today's daily note
```
## 🌱 [[Goals]]
```dataview
TABLE filter(file.etags, (x) => contains(x, "#topic")) AS "Tags" FROM #type/goal WHERE !contains(file.folder, "template") LIMIT 10
```
```button
name New Goal
type command
action From Template: Goal
```

## 💾 [[Resources]]
```dataview
TABLE filter(file.etags, (x) => contains(x, "#topic")) AS "Tags" FROM #type/resource WHERE !contains(file.folder, "template") LIMIT 10
```
```button
name New Resource
type command
action From Template: Resource
```
