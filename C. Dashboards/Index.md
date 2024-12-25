---
tags:
  - type/dashboard
obsidianUIMode: preview
typeToHide:
  - obsidian
  - nvim
cssclasses:
  - dashboard
---
`button-daily` `button-weeklynote`
`button-inboxnotenotitle` `button-fastnote` `button-inboxnote`
## Dashboards
* Journal
	* [[Fast Notes]]
	* [[Notes from Daily Notes]]
	* [[Journal]]
* Dataview
	* [[Note Inbox]]
	* [[Collection Inbox]]
	* [[Notes and Tags by Recent]]
	* [[Notes by Size]]
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
    { name : 'Type', type : 'select', args : { fieldName : 'projectType' } }
];

const activeProjects = resources.filter(p => { return (!p.archived && !p.done && !p.backlog && !p.coldtask)});
const coldtaskProjects = resources.filter(p => { return (p.coldtask)});
tableDrawer.setState('activeProjects', activeProjects);
dv.header(3, 'Active');
await tableDrawer.drawTable(ACTIVE_PROJECTS_TABLE, activeProjects, { dv, app: this.app, instance : this });
dv.header(3, 'Cold');
await tableDrawer.drawTable(ACTIVE_PROJECTS_TABLE, coldtaskProjects, { dv, app: this.app, instance : this });
```


tab: 📚 Resources
[[C. Dashboards/Main/Resources|📚 All Resources]]

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

tab: 😅 Areas
[[C. Dashboards/Main/Areas|😅 All Areas]]

```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/area AND !#archive WHERE !contains(file.folder, "template")
```
````
## Vault Info
- 🗄️ Recent file updates
 `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(4).file.link)`
- 🔖 Tagged:  favorite
 `$=dv.list(dv.pages('#favorite').sort(f=>f.file.name,"desc").limit(4).file.link)`
- 〽️ Stats
	-  File Count: `$=dv.pages().length`
	-  Personal recipes: `$=dv.pages('"Family/Recipes"').length`
