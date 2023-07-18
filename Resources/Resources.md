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

let returnLink = (noteName) => {
    return `<a data-href="${noteName}" href="${noteName}" class="internal-link data-link-icon data-link-icon-after data-link-text" target="_blank" rel="noopener" data-link-tags="#type/resource" data-link-path="Resources/${noteName}.md">${noteName}</a>`;
};

let getNewGraphBySearchWord = (graph, searchTerm) => {
    let newGraph = {};
    if (!!searchTerm) {
        Object.keys(graph).forEach(key => {

            if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                newGraph[key] = graph[key];
                return;
            }

            let elementArray = graph[key].filter(word => word.toLowerCase().includes(searchTerm.toLowerCase())).sort();
            if (elementArray.length > 0) {
                newGraph[key] = elementArray;
            }
        });
        return newGraph;
    }
    return graph;
}

let getParentResources = (graph, searchTerm) => {
    if (!!searchTerm) {
        return Object.keys(graph).filter(word => word.toLowerCase()).sort();
    }
    return Object.keys(graph).sort();
}


let graphToLinks = (graph, searchTerm) => {
    const newGraph = getNewGraphBySearchWord(graph, searchTerm);
    const parentResources = getParentResources(newGraph);
    let text = '<ul>';
    parentResources.forEach(keyString => {
        text += '<li>' + returnLink(keyString);
        if (newGraph[keyString].length > 0) {
            text += '<ul>';
            newGraph[keyString].sort().forEach(sublink => {
                text += '<li>' + returnLink(sublink) + '</li>';
            });
            text += '</ul>';
        }
        text += '</li>';
    });
    return text + '</ul>';
}

dv.header(1, 'List of resources, and their subresources (needs imporvement)');

//let filterElement = this.container.createEl('input', {id : "asd", cls: ["navbar","card"]});
let filterElement = this.container.createEl('input', {id : "asd", value: localStorage.getItem("searchWord"), cls: []});
let textContainer = this.container.createEl('div', {innerHTML : graphToLinks(getFinalGraph(familyTree), '') });

textContainer.innerHTML = graphToLinks(getFinalGraph(familyTree), localStorage.getItem("searchWord"));
filterElement.addEventListener("input", (event) => {
    localStorage.setItem("searchWord", event.target.value);
    textContainer.innerHTML = graphToLinks(getFinalGraph(familyTree), event.target.value);
});


drawList(resources.filter(p => { return !p.archived}), false);
drawList(resources.filter(p => { return p.archived}), true);


//let mindmap = `
//\`\`\`markmap
//- asdfsdaf
//    - aaa
//\`\`\`
//`;
//dv.span(mindmap);
```

# How to Use
* In the list inside of every entry, it's the note that references the following resource

