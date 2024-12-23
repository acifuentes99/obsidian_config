---
tags:
  - type/dashboard
obsidianUIMode: preview
sticker: 1f4be
cssclasses:
  - dashboard
---
`button-lqz2`
# Recent Resources

```dataviewjs
// Get all notes with the tag "resource"
let pages = dv.pages("#type/resource");
const { tableDrawer } = customJS;

// Sort the pages by the "timestamp" property in ascending order
pages = pages.sort(p => tableDrawer.getTimestamp(p, dv), 'desc').limit(20);

// Render the table
dv.table(
    ["File Name", "Timestamp"],
    pages.map(p => [p.file.link, tableDrawer.getTimestamp(p, dv)])
);
```

```dataviewjs
let prefixMap = {};
let graphs = {}; // Idea : { seccion: notas }

const getFileInfo = (file) => {
    //if (file == undefined || file.inlinks.values[0]) {
    //    return {};
    //}
    let isArchived = true;
    let inlinks = [];
    let parents = [];
    let category = 'Otros';

    if (file.inlinks.values.length > 0) {
        for (let link of file.inlinks.values) {
            let p = dv.page(link.path);
            if (!p.tags) {
                continue;
            }
            if (p.tags.contains("archive")) {
                isArchived = isArchived && true;
            }
            else {
                isArchived = isArchived && false;
            }
            inlinks.push('[[' + p.file.path + ']]');

            if (p.tags.contains("type/resource")) {
                parents.push(p.file.name);
            }
        }
    }
    if (inlinks.length === 0) {
        isArchived = true;
    }
    if (file.tags.values.includes("#archive")) {
        prefixMap[file.name] = '📁';
    }
    if ('category' in file.frontmatter) {
        category = file.frontmatter.category;
    }
    let object = {
        link : '[[' + file.path + '|' + file.name + ']]',
        file : file,
        category : category,
        inlinks : inlinks,
        archived : isArchived,
        parents : parents
        //archivedInlinks
        //activeInlinks
    };
    return object;
}


const drawList = (resources, showArchive) => {
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

//dv.list(['Asd<ul> <li>Coffee <ul> <li>Black tea</li> <li>Green tea</li> </ul> </li> <li>Tea <ul> <li>Black tea</li> <li>Green tea</li> </ul> </li> <li>Milk</li></ul>','<ul> <li>Coffee <ul> <li>Black tea</li> <li>Green tea</li> </ul> </li> <li>Tea <ul> <li>Black tea</li> <li>Green tea</li> </ul> </li> <li>Milk</li></ul>','<ul> <li>Coffee <ul> <li>Black tea</li> <li>Green tea</li> </ul> </li> <li>Tea <ul> <li>Black tea</li> <li>Green tea</li> </ul> </li> <li>Milk</li></ul>'])


let resources = [];
let parentByChildNoteTree = {};
let queryAsd = '-"Z. Meta" and #type/resource';
let resultsResources = dv.pages(queryAsd).sort(p => p.file.mday, 'desc');

let temportalParentGraph = {};
let categoryByNoteName = {};

for (let result of resultsResources) {
    let fileInfo = getFileInfo(result.file);
    resources.push(fileInfo);
    parentByChildNoteTree[fileInfo.file.name] = fileInfo.parents;

    categoryByNoteName[fileInfo.file.name] = fileInfo.category;
    if (!(fileInfo.category in temportalParentGraph)) {
        temportalParentGraph[fileInfo.category] = {};
    }
}


/*
    * Crear el objeto de categorias de padre
    * Actualmente lo hace HORRIBLE (Usa un Object.keys o Entries, para simplemente utilizar
    * un array, para filtar a padres
*/
for (const [key, value] of Object.entries(parentByChildNoteTree)) {
    /* el siguiente if... FILTRA A TODOS LOS PADRES (no tienen links dentro) */
    if (value.length > 0) {
        continue;
    }
    temportalParentGraph[categoryByNoteName[key]][key] = value;
}


const graphToLinks = (graph, searchTerm) => {
    /*
     * Dependiendo del termino de busqueda, filtra los links a mostrar
     * graph : TODO
     * searchTerm : <String> Valor a filtrar en graph
    */

    const newGraph = getNewGraphBySearchWord(graph, searchTerm);
    const parentResources = getParentResources(newGraph);

    let text = '';
    for (const [key, value] of Object.entries(temportalParentGraph)) {
        //for (const [key2, value2] of Object.entries(value)) {
        //}
        text += getHtmlText(Object.keys(value), newGraph, key);
    }
    return text;
    <!-- return getHtmlText(parentResources, newGraph, 'Otros'); -->
}

const getHtmlText = (parentResources, newGraph, section) => {
    /*
     * Obtiene el HTML a mostrar, dependiendo de los recursos Padre, y que tiene de
     * valores en newGraph
     * parentResources: [] de String, de recursos Padre
     * newGraph: {<recurso padre> : [<recursos hijos>]}
     * section: <String> El titulo de la sección (categoria cuando este implmentado)
    */

    let text = '<h2>' + section + '</h2><ul>';
    parentResources.forEach(keyString => {
        text += '<li>' + returnLink(keyString);
        if (newGraph[keyString] && newGraph[keyString].length > 0) {
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


// No se que hace... pero al final limpia el grafo
const getFinalGraph = (parentByChildNoteTree) => {
    let finalGraph = {};
    let currentChildren = new Set();
    for (element in parentByChildNoteTree) {
        if (finalGraph[element] == null) {
            finalGraph[element] = [];
        }
        parentByChildNoteTree[element].forEach( (subelement) => {
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

const returnLink = (noteName) => {
    let prefix = '';
    if (noteName in prefixMap) {
        prefix = prefixMap[noteName];
    }
    return `<a data-href="${noteName}" href="${noteName}" class="internal-link data-link-icon data-link-icon-after data-link-text" target="_blank" rel="noopener" data-link-tags="#type/resource" data-link-path="Resources/${noteName}.md">${prefix}${noteName}</a>`;
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


dv.header(1, 'List of resources, and their subresources (needs imporvement)');

let filterElement = this.container.createEl('input', {id : "asd", value: localStorage.getItem("searchWord"), cls: []});
let textContainer = this.container.createEl('div', {innerHTML : graphToLinks(getFinalGraph(parentByChildNoteTree), '') });

textContainer.innerHTML = graphToLinks(getFinalGraph(parentByChildNoteTree), localStorage.getItem("searchWord"));
filterElement.addEventListener("input", (event) => {
    localStorage.setItem("searchWord", event.target.value);
    textContainer.innerHTML = graphToLinks(getFinalGraph(parentByChildNoteTree), event.target.value);
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

