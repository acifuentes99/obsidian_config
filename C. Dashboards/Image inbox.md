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

```dataviewjs
const { tableDrawer, projectUtils } = customJS;
const currentFile = dv.current().file;

const queryProjects = '"Z. Meta/img-camera"';
const resultsResources = dv.pages(queryProjects);
console.log(resultsResources);
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


// const activeProjects = resources.filter(p => { return (!p.archived && !p.done && !p.backlog)});
// tableDrawer.setState('activeProjects', activeProjects);
tableDrawer.drawTable(ACTIVE_PROJECTS_TABLE, resources, { dv, app: this.app, instance : this });
```
