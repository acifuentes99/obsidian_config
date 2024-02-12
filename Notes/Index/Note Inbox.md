---
tags:
  - type/dashboard
last-days: 100 days
number-results: 2000
filter-grade: 0
startdate: ""
enddate: ""
show-archive: false
null-date: false
obsidianUIMode: preview
sticker: emoji//1f4e5
---

> [!NOTE]- Uso de dashboard
> * `filter-grade`
> 	* 0 : Notas sin un type/ incluido (mas suave)
> 	* 1 : Notas sin una Coleccion como padre, o una PARA note como padre
> 		* Este filtro, muestra notas igual que pueden estar enlazadas a otras notas
> 	* 2 : Notas sin un PARA note como padre
> 	* 3 : TODAS las Notas (que cumplen con el primer filtro de dv)
> * `null-date`
> 	* Parámetro temporal
> 	* Muestra notas, donde su átributo "timestamp" es null (sirve para hacer limpieza de fechas)
> * `show-achive`
> 	* Agrega notas que estan Archivadas
> 	* También, se agrega columna "archived" (es arte)

```button
name Refresh
type command
action Dataview: Force Refresh All Views and Blocks
```
^button-q0fh

```dataviewjs
const currentPage = dv.current().file;
const { tableDrawer } = customJS;
const startDate = tableDrawer.parseDate(currentPage.frontmatter["startdate"], dv);
const endDate = tableDrawer.parseDate(currentPage.frontmatter["enddate"], dv);
const dummyFiles = ["Trailhead Enterprise Patterns", "Ideas cambio de mindset", "El Cuerpo - Una celula de trabajo"];

const filterValuesForInbox = (p) => {
    const hasAtLeastOneTypeTag = p.file.inlinks.values.reduce((accum, curr) => 
        accum && !hasTypeTag(curr.path)
    , true);
    return hasAtLeastOneTypeTag;
}

/* Idea:
 * Si padre no incluye alguno de los tags presentes... entonces,
 * la nota se muestra en el Note Inbox
 */
const hasTypeTag = (path) => {
    let typeTags;
    if (currentPage.frontmatter["filter-grade"] === 0) {
        typeTags = ["#type"];
    }
    else if (currentPage.frontmatter["filter-grade"] === 1) {
        typeTags = ["#type/area","#type/collection","#type/project","#type/resource","#type/dashboard","#type/goal"];
    }
    else {
        typeTags = ["#type/area","#type/project","#type/resource","#type/dashboard","#type/goal"];
    }
    return typeTags.some(x => dv.page(path).file.tags.values.includes(x));
}

const filterByDate = (p) => {
    const fileDate = tableDrawer.parseDate(p.file.frontmatter.timestamp, dv);
    return fileDate != '' &&
        (endDate == null || fileDate < endDate) &&
        (startDate == null || fileDate > startDate);
}

const filterByNullDate = (p) => {
    const fileDate = tableDrawer.parseDate(p.file.frontmatter.timestamp, dv);
    return fileDate == null;
}

const dateFilter = currentPage.frontmatter["null-date"] ? filterByNullDate : filterByDate;
const noteFilter = (p) => currentPage.frontmatter["filter-grade"] === 3 ? true : (p.file.inlinks.length === 0 || filterValuesForInbox(p));
const whereClause = (p) => {
    return noteFilter(p) &&
        dateFilter(p);
}

// const consoleame = (a, b) => {
//     if (dummyFiles.some(x => a.file.name === x) ){
//         console.log("cosa " + a.file.path);
//         console.log("inlinks de la cosa " + a.file.inlinks);
//         console.log(currentPage.frontmatter["para-note-parent"]);
//         console.log(dv.page(a.file.inlinks[0].path).file.tags.values);
//         console.log("valor de la cosa " + b);
//     } 
// }

let query = '-#journal \
and -#dashboard \
and -#type/resource \
and -#type/goal \
and -#type/area \
and -#type/project \
and -#type/collection \
and -#type/dashboard \
and -"template" \
and -"X-Plugins" \
and -"Z-Meta"'
if (!currentPage.frontmatter["show-archive"]) {
    query = query + ' and -#archive';
}
let queryResults = dv.pages(query)
    .where(p => whereClause(p))
    .sort(p => p.file.frontmatter.timestamp, 'desc')
    .limit(currentPage.frontmatter["number-results"]);

let NOTE_INBOX_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Size', type : 'text', code : (f) => f.file.size },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
];
if (currentPage.frontmatter["show-archive"]) {
    NOTE_INBOX_TABLE.push({ name : 'Archived', type : 'text', code : (f) => f.file.tags.values.includes('#archive') ? '✅' : '❌' });
}

tableDrawer.drawTable(NOTE_INBOX_TABLE, queryResults, {dv:dv,app:this.app,instance:this});
```
