---
tags: type/dashboard
emoji: 
zettel-prefix: 202207232208
show-archive: false
---
# Project Overview

* Idea: Mostrar una vista resumida, de proyectos, progresos, tasks, etc... de los activos
    * Proyectos activos - inactivos
* Mostrar actividad por proyecto (modified date de los resultados?)



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


* Obs:
	* De momento.. solo filtra por modificación de Outlinks del proyecto (task, journal, o notes dentro del mismo, etc). Aun no lo hace, por notas internas del recurso
	* Esto.. tengo que estudiarlo/pensarlo bien, para poder ser implementado, ya que va a tener una lógica de recursión

# Otras consultas

```dataview
TABLE filter(file.etags, (x) => contains(x, "#topic")) AS "Tags" FROM #type/project and !#archive WHERE !contains(file.folder, "template")
```
