---
tags:
  - topic/default
  - purpose/default
  - toReview
  - type/dashboard
timestamp: 2024-03-25T18:19:39
status: active
start-date: 
end-date:
---

# Resources by Date

```button
name Refresh
type command
action Dataview: Force Refresh All Views and Blocks
```

```dataviewjs
const { tableDrawer, projectUtils } = customJS;
const activeResourcesKey = 'nvimActRes';
const projectResourcesKey = 'nvimProyRes';
const projectType = 'nvim';


const queryProjects = '-"Z. Meta" and #type/resource';
const resultsResources = dv.pages(queryProjects);
const args = {
    projectType: projectType
}

console.log(resultsResources);
const resources = projectUtils.getResourceNotes(resultsResources, dv, args);
tableDrawer.setState(projectResourcesKey, resources);

const ACTIVE_PROJECTS_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
    { name : 'Status', type : 'select', args : { fieldName : 'status' } },
];

console.log(resources);
// const activeProjects = resources.filter(p => { return (!p.archived && !p.done && !p.backlog)});
tableDrawer.drawTable(ACTIVE_PROJECTS_TABLE, resources, { dv, app: this.app, instance : this });
```
