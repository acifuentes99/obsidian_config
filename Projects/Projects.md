---
tags: type/dashboard
obsidianUIMode: preview
sticker: 1f4d4
---

```button
name New Project
type command
action From Template: Project
```

```dataviewjs
let checkIfPARANoteIsArchived = (file) => {
    let isArchived = false;
    let isDone = false;
    let inlinks = [];
    let journals = [];
    if (file.inlinks.values.length > 0) {
        for (let link of file.inlinks.values) {
            let p = dv.page(link.path);
            inlinks.push('[[' + p.file.path + ']]');
        }
    }
    if (file.outlinks.values.length > 0) {
        for (let link of file.outlinks.values) {
            if (link.path.includes("Y-Journal/RelatedJournal")) {
                journals.push('[[' + link.path + ']]');
            }
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
        done : isDone,
        journals : journals
        //archivedInlinks
        //activeInlinks
    };
    return object;
}


let drawList = (resources, title) => {
    let text = [];
    dv.header(1, title + ' (' + resources.length + ')');
    for (let p of resources) {
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

let drawJournals = (resources, title) => {
    let text = [];
    dv.header(1, title + ' (' + resources.length + ')');
    for (let p of resources) {
        let asd = '';
        let emoji = p.file.frontmatter?.emoji == null ? '' : p.file.frontmatter?.emoji;
        console.log(p.journals);
        for (let journalLink of p.journals) {
            asd = asd + emoji + ' ' + journalLink + '<ul>';

        }
        asd = asd + '</ul>';
        text.push(asd);
    }
    dv.table(['name','extra'], text.map(b => [b, '']));
}

let resources = [];
let queryProjects = '-"Z-Meta" and #type/project';
let resultsResources = dv.pages(queryProjects).sort(p => p.file.mday, 'desc');

for (let result of resultsResources) {
    resources.push(checkIfPARANoteIsArchived(result.file));
}

drawList(resources.filter(p => { return (!p.archived && !p.done)}), 'Active');
drawJournals(resources.filter(p => { return (!p.archived && p.journals.length > 0)}), 'Journals');
drawList(resources.filter(p => { return p.archived}), 'Archived');
drawList(resources.filter(p => { return p.done}), 'Done');
```
