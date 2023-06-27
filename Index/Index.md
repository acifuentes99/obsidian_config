---
icon: teddy_bear
tags: type/dashboard
obsidianUIMode: preview
sticker: 1f9f8
---
# 🧸 [[Index]]

## **Notes to Order**

* [[Note Inbox]]
* [[Notes and Tags by Recent]]
* [[Notes non Tagged]]
* [[Notes by Size]]
* [[Ideas Rápidas]]

## 📔 [[Projects]]

```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/project AND !#archive AND !#done WHERE !contains(file.folder, "template") 
```
## 📔 [[Projects|Project Journals]]

```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name" FROM #journal/related WHERE !contains(file.folder, "template") AND all(file.inlinks, (x) => !contains(meta(x).tags, "#archived"))
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
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/goal AND !#archive AND !#done WHERE !contains(file.folder, "template") LIMIT 10
```

## 💾 [[Resources]]

```dataviewjs
let checkIfPARANoteIsArchived = (file) => {
    let isArchived = true;
    let inlinks = [];
    if (file.inlinks.values.length > 0) {
        for (let link of file.inlinks.values) {
            let p = dv.page(link.path);
            if (!p.tags) {
                continue;
            }
            if (p.tags.contains("archive") || p.tags.contains("resource")) {
                isArchived = isArchived && true;
            }
            else {
                isArchived = isArchived && false;
            }
            inlinks.push('[[' + p.file.path + ']]');
        }
    }
    if (inlinks.length === 0) {
        isArchived = true;
    }
    let object = {
        link : '[[' + file.path + '|' + file.name + ']]',
        file : file,
        inlinks : inlinks,
        archived : isArchived
    };
    return object;
}

let drawList = (resources, showArchive) => {
    let text = [];
    let title = showArchive ? 'Archived Resources' : 'Active Resources';
    for (let p of resources) {
        let displayText = '';
        let emoji = p.file.frontmatter?.emoji == null ? '' : p.file.frontmatter?.emoji;
        displayText = displayText + emoji + ' ' + p.link + '<ul>';
        if (!(p.inlinks)) {
            continue;
        }
        if (p.inlinks.length > 0) {
            for (let link of p.inlinks) {
                displayText = displayText + '<li\>' + link + '</li>';
            }
        }
        displayText = displayText + '</ul>';
        p.displayText = displayText;
        text.push(p);
    }
    dv.table(['name','notes'], text.map(p => [p.displayText, p.file.outlinks.length]));
}
let resources = [];
let queryAsd = '-"Z-Meta" and #type/resource';
let resultsResources = dv.pages(queryAsd).sort(p => p.file.mday, 'desc');

for (let result of resultsResources) {
    resources.push(checkIfPARANoteIsArchived(result.file));
}

drawList(resources.filter(p => { return !p.archived}), false);
```

## 😱 [[Areas]]

```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name" FROM #type/area AND !#archive WHERE !contains(file.folder, "template") LIMIT 10
```
