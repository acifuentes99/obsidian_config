---
tags: type/dashboard
obsidianUIMode: preview
sticker: 1f4be
---

```button
name New Resource
type command
action From Template: Resource
```

```dataviewjs
let getFileInfo = (file) => {
    //if (file == undefined || file.inlinks.values[0]) {
    //    return {};
    //}
    let isArchived = true;
    let inlinks = [];
    let parents = [];
    if (file.inlinks.values.length > 0) {
        for (let link of file.inlinks.values) {
            let p = dv.page(link.path);
            if (!p.tags) {
                continue;
            }
            //if (p.tags.contains("archive") || p.tags.contains("resource")) {
            if (p.tags.contains("archive")) {
                isArchived = isArchived && true;
            }
            else {
                isArchived = isArchived && false;
            }
            inlinks.push('[[' + p.file.path + ']]');

            if (p.tags.contains("resource")) {
                parents.push(p.file.name);
            }
        }
    }
    if (inlinks.length === 0) {
        isArchived = true;
    }
    let object = {
        link : '[[' + file.path + '|' + file.name + ']]',
        file : file,
        inlinks : inlinks,
        archived : isArchived,
        parents : parents
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
    }
    dv.table(['name','notes'], text.map(p => [p.displayText, p.file.outlinks.length]));
}

let resources = [];
let familyTree = {};
let queryAsd = '-"Z-Meta" and #type/resource';
let resultsResources = dv.pages(queryAsd).sort(p => p.file.mday, 'desc');

for (let result of resultsResources) {
    let fileInfo = getFileInfo(result.file);
    resources.push(fileInfo);
    familyTree[fileInfo.file.name] = fileInfo.parents;
}

let getFinalGraph = (familyTree) => {
    let finalGraph = {};
    let currentChildren = new Set();
    for (element in familyTree) {
        if (finalGraph[element] == null) {
            finalGraph[element] = []; 
        }
        familyTree[element].forEach( (subelement) => {
            currentChildren.add(element);
            if (finalGraph[subelement] == null) {
                finalGraph[subelement] = [element];
            }
            else {
                finalGraph[subelement].push(element);
            }
        });
    }
    currentChildren.forEach((element) => {
        delete finalGraph[element];
    });
    return finalGraph;
}

drawList(resources.filter(p => { return !p.archived}), false);
drawList(resources.filter(p => { return p.archived}), true);

dv.header(1, 'List of resources, and their subresources (needs imporvement)');
dv.span(getFinalGraph(familyTree));

//console.log(resultsResources); 

let mindmap = `
\`\`\`markmap
- asdfsdaf
    - aaa
\`\`\`
`;
dv.span(mindmap);
```

# How to Use
* In the list inside of every entry, it's the note that references the following resource
