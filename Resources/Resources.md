---
tags: type/dashboard
obsidianUIMode: preview
---

```button
name New Resource
type command
action From Template: Resource
```

```dataviewjs
let checkIfPARANoteIsArchived = (file) => {
    //if (file == undefined || file.inlinks.values[0]) {
    //    return {};
    //}
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
        //archivedInlinks
        //activeInlinks
    };
    return object;
}


let drawList = (resources, showArchive) => {
    let text = [];
    let title = showArchive ? 'Archived Resources' : 'Active Resources';
    //let emoji = showArchive ? '📁' : '✅';
    dv.header(1, title + ' (' + resources.length + ')');
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
        console.log(p);
    }
    dv.table(['name','notes'], text.map(p => [p.displayText, p.file.outlinks.length]));
}
let resources = [];
let queryAsd = '-"Ω. Meta" and #type/resource';
let resultsResources = dv.pages(queryAsd).sort(p => p.file.mday, 'desc');

for (let result of resultsResources) {
    resources.push(checkIfPARANoteIsArchived(result.file));
}

drawList(resources.filter(p => { return !p.archived}), false);
drawList(resources.filter(p => { return p.archived}), true);
```