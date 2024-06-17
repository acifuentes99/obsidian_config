---
tags:
  - type/dashboard
obsidianUIMode: preview
sticker: 1f4d4
show-level-1: true
show-level-2: true
show-level-3: true
show-done: true
typeToHide:
  - obsidian
  - nvim
---
## Periodic Notes
 `button-daily` `button-weeklynote`
* [[Fast Notes]]
* [[Notes from Daily Notes]]
* [[Journal]]
## Commands
`button-fastnote` `button-inboxnote`
## PARA Notes
````tabs
tab: ✍🏼 Projects
[[C. Dashboards/Main/Projects|✍ All Projects]]

```dataviewjs
const { tableDrawer, projectUtils } = customJS;
const currentFile = dv.current().file;

const queryProjects = '-"T. Templates" and #type/project';
const resultsResources = dv.pages(queryProjects);
const args = {
    typeToHide: currentFile.frontmatter.typeToHide
}

const resources = projectUtils.getProjectNotes(resultsResources, dv, args);
tableDrawer.setState('projectResources', resources);

const ACTIVE_PROJECTS_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
    { name : 'Status', type : 'select', args : { fieldName : 'status' } },
    { name : 'Type', type : 'select', args : { fieldName : 'projectType' } },
    { name : 'Action', type : 'button', args : { name : 'To Backlog', click : null, params  : (f) => ['status', 'active', f, this.app] }  },
];

const activeProjects = resources.filter(p => { return (!p.archived && !p.done && !p.backlog)});
tableDrawer.setState('activeProjects', activeProjects);
tableDrawer.drawTable(ACTIVE_PROJECTS_TABLE, activeProjects, { dv, app: this.app, instance : this });
```


tab: 📚 Resources
[[C. Dashboards/Main/Resources|📚 All Resources]]

```dataviewjs
// Get all notes with the tag "resource"
let pages = dv.pages("#type/resource");
const { tableDrawer } = customJS;

// Sort the pages by the "timestamp" property in ascending order
pages = pages.sort(p => tableDrawer.getTimestamp(p, dv), 'desc').limit(20);
console.log(pages);

// Render the table
dv.table(
    ["File Name", "Timestamp"],
    pages.map(p => [p.file.link, tableDrawer.getTimestamp(p, dv)])
);
```

tab: 😅 Areas
[[C. Dashboards/Main/Areas|😅 All Areas]]

```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/area AND !#archive WHERE !contains(file.folder, "template")
```
````
## Dashboards (more heavyweight)
* [[Note Inbox]]
* [[Collection Inbox]]
* [[Notes and Tags by Recent]]
* [[Notes by Size]]