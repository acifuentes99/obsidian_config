---
icon: teddy_bear
tags: type/index, topic/notetaking/index, status/prod
---
# 🧸 Index

## Dashboard

* [[Note Inbox]]
* [[Project Overview]]
* [[PARA Notes]]
* [[Notes by Size]]

## 😱 Areas
```button
name New Area
type command
action From Template: Area
```
* [[Tech]]
* [[Reflexiones]]
* [[Life Knowledge]]
* [[Career]]
* [[Productivity]]

## 📔 Projects
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
TABLE last-one as "Last One" FROM #journal/weekly WHERE !contains(file.folder, "template-journal") SORT file.name DESC LIMIT 7
```
```button
name Current Week Note
type command
action Periodic Notes: Open this week's note
color default
```

## 💾 Resources
```dataview
TABLE filter(file.etags, (x) => contains(x, "#topic")) AS "Tags" FROM #type/resource WHERE !contains(file.folder, "template") 
```
```button
name New Resource
type command
action From Template: Resource
```

## Shortcuts

| leader + i              | Index                               |
|-------------------------|-------------------------------------|
| leader + j              | Jounral                             |
| leader + w + leader + w | Entrada Journal de hoy              |
| leader + w + leader + i | Actualizar index de Journal         |
| ctrl + up               | Entrada Journal dia anterior        |
| ctrl + down             | Entrada Journal dia siguiente       |
| leader + nz             | Nuevo zettlekasten                  |
| alt + l                 | Añadir link a zettlekasten          |
| :VimwikiTable           | Añadir Tabla                        |
| Enter (insert mode)     | Añadir fila / ir hacia abajo        |
| Tab (insert mode)       | Añadir columna / ir a la derecha    |
| leader + p              | Proyectos                           |
| S* (visual mode)        | Enegrecer/Destacar texto en V.block |

## Markdown
_This text will be italic_, *this too*
**This text will be bold**, __this too__
~~This text will be striked~~

Más shortcuts : https://gist.github.com/drkarl/4c503bccb62558dc85e8b1bc0f29e9cb
Mindmap de acciones y core values: https://coggle.it/diagram/X8OnH1JoLAJ78l_n/t/-
