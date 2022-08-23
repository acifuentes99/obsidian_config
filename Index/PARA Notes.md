---
tags: type/dashboard
emoji: 
zettel-prefix: 202207232208
show-archive: false
cssClass: row-highlight
---
# Goals
* Links esperados : Areas
```dataviewjs
let currentFile = dv.current().file;
let showArchive = currentFile.frontmatter["show-archive"] ? '' : 'and -#archive';
let projectPages = dv.pages('#type/goal and -"Ω. Meta/template-notes"' + showArchive);
let data = {};

let notLinkedResources = new Set();
let linkedResources = new Set();

function showLinksAndDataBySection(page) {

    for (let inlink of page.file.inlinks.array()) {
        let inlinkPageTags = dv.page(inlink.path).file.tags.values;
        if (inlinkPageTags.includes('#type/area')) {
            linkedResources.add(page);
            return;
        }
        notLinkedResources.add(page);
    }
}

for (let page of projectPages) {
	showLinksAndDataBySection(page)
}

dv.header(2, 'Non linked Goals');
dv.list(dv.array(Array.from(notLinkedResources)).file.link);
let headers = ["Resource", "LinkedTo"];
let results = dv.array(Array.from(linkedResources)).map(page => [page.file.link, page.file.inlinks ]);
dv.header(2, 'Linked Goals');
dv.table(headers, results);
```

# Proyectos
* Links esperados : Goals, Areas
* TODO : Hay proyectos en nonlinked, los cuales si tienen un link
	* Anotar el tipo de PARA note igual a la derecha del linked to
```dataviewjs
let currentFile = dv.current().file;
let showArchive = currentFile.frontmatter["show-archive"] ? '' : 'and -#archive';
let projectPages = dv.pages('#type/project and -"Ω. Meta/template-notes"' + showArchive);
let data = {};

let notLinkedResources = new Set();
let linkedResources = new Set();

function showLinksAndDataBySection(page) {

    for (let inlink of page.file.inlinks.array()) {
        let inlinkPageTags = dv.page(inlink.path).file.tags.values;
        if (inlinkPageTags.includes('#type/goal') || inlinkPageTags.includes('#type/area')) {
            linkedResources.add(page);
            return;
        }
        notLinkedResources.add(page);
    }
}

for (let page of projectPages) {
	showLinksAndDataBySection(page)
}

dv.header(2, 'Non linked Proyects');
dv.list(dv.array(Array.from(notLinkedResources)).file.link);
let headers = ["Resource", "LinkedTo"];
let results = dv.array(Array.from(linkedResources)).map(page => [page.file.link, page.file.inlinks ]);
dv.header(2, 'Linked Proyects');
dv.table(headers, results);
```

# Resources
* Links esperados : Proyectos, Goals, Areas
```dataviewjs
let currentFile = dv.current().file;
let showArchive = currentFile.frontmatter["show-archive"] ? '' : 'and -#archive';
let projectPages = dv.pages('#type/resource and -"Ω. Meta/template-notes"' + showArchive);
let data = {};

let notLinkedResources = new Set();
let linkedResources = new Set();

function showLinksAndDataBySection(page) {

    for (let inlink of page.file.inlinks.array()) {
        let inlinkPageTags = dv.page(inlink.path).file.tags.values;
        if (inlinkPageTags.includes('#type/project') || inlinkPageTags.includes('#type/goal') || inlinkPageTags.includes('#type/area')) {
            linkedResources.add(page);
            return;
        }
        notLinkedResources.add(page);
    }
}

for (let page of projectPages) {
	showLinksAndDataBySection(page)
}

dv.header(2, 'Non linked Resources');
dv.list(dv.array(Array.from(notLinkedResources)).file.link);
let headers = ["Resource", "LinkedTo"];
let results = dv.array(Array.from(linkedResources)).map(page => [page.file.link, page.file.inlinks ]);
dv.header(2, 'Linked Resources');
dv.table(headers, results);
```


* Mejora a futuro:
	* Mostrar el tipo de link, en LinkedTo (este habría que dejarlo en un Objeto dentro del js)
