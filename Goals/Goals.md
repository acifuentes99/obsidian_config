---
tags: type/dashboard
obsidianUIMode: preview
---
```button
name New Goal
type command
action From Template: Goal
```

```dataviewjs
let checkIfPARANoteIsArchived = (file) => {
    let isArchived = false;
    let isDone = false;
    let inlinks = [];
    if (file.inlinks.values.length > 0) {
        for (let link of file.inlinks.values) {
            let p = dv.page(link.path);
            inlinks.push('[[' + p.file.path + ']]');
        }
    }
    if (file.tags.values.includes("#done")) {
        isDone = true;
    }
    else if (file.tags.values.includes("#archive")) {
        isArchived = true;
    }
    let object = {
        link : '[[' + file.path + '|' + file.name + ']]',
        file : file,
        inlinks : inlinks,
        archived : isArchived,
        done : isDone
        //archivedInlinks
        //activeInlinks
    };
    return object;
}


let drawList = (resources, title) => {
    let text = [];
    dv.header(1, title + ' (' + resources.length + ')');
    for (let p of resources) {
        console.log(p);
        let asd = '';
        let emoji = p.file.frontmatter?.emoji == null ? '' : p.file.frontmatter?.emoji;
        asd = asd + emoji + ' ' + p.link + '<ul>';
        if (!(p.inlinks)) {
            continue;
        }
        if (p.inlinks.length > 0) {
            for (let link of p.inlinks) {
                asd = asd + '<li\>' + link + '</li>';
            }
        }
        asd = asd + '</ul>';
        text.push(asd);
    }
    dv.table(['name','extra'], text.map(b => [b, '']));
}

let resources = [];
let queryAsd = '-"Ω. Meta" and #type/goal';
let resultsResources = dv.pages(queryAsd).sort(p => p.file.mday, 'desc');

for (let result of resultsResources) {
    resources.push(checkIfPARANoteIsArchived(result.file));
}

drawList(resources.filter(p => { return (!p.archived && !p.done)}), 'Active');
drawList(resources.filter(p => { return p.archived}), 'Archived');
drawList(resources.filter(p => { return p.done}), 'Done');
```