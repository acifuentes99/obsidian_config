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

`button-lqz2`

> [!info]- new project?
> ```button
> name New Project
> type command
> action From Template: Project
> ```
> ProjectType values : [[T. Templates/metadata-menu/Projects|Projects]]
> * Docu : [[Obsidian Proyects Docs]]

> [!NOTE]- Task List
>
> ```dataviewjs
> const { testClass } = customJS;
> const activeProjects = testClass.getState('activeProjects');
>
> await dv.view("Z. Meta/dv-views/project-tasks", { activeProjects: activeProjects });
> ```

> [!NOTE]- Backlog Tasks
>
> ```dataviewjs
> const { testClass } = customJS;
> const resources = testClass.getState('projectResources');
    > await dv.view("Z. Meta/dv-views/project-tasks", { activeProjects: resources.filter(p => { return p.backlog}) });
> ```

### Alt Projects
* [[Nvim Projects]]
* [[Obsidian Projects (Post 11 Feb 2024)]]
* [[Book and Self development action plans]]

## Active

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

const activeProjects = resources.filter(p => { return (!p.archived && !p.done && !p.backlog && !p.coldtask)});
tableDrawer.setState('activeProjects', activeProjects);
tableDrawer.drawTable(ACTIVE_PROJECTS_TABLE, activeProjects, { dv, app: this.app, instance : this });
```

## Cold Tasks
```dataviewjs
const { tableDrawer } = customJS;

const COLD_TASKS_PROJECTS_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
    { name : 'Status', type : 'select', args : { fieldName : 'status' } },
    { name : 'Type', type : 'select', args : { fieldName : 'projectType' } },
    { name : 'Action', type : 'button', args : { name : 'To Active', click : null, params  : (f) => ['status', 'active', f, this.app] }  },
];

const coldTaskProjects = tableDrawer.getState('projectResources').filter(p => { return p.coldtask });
tableDrawer.drawTable(COLD_TASKS_PROJECTS_TABLE, coldTaskProjects, {dv:dv,app:this.app,instance:this});
```

## Backlog
```dataviewjs
const { tableDrawer } = customJS;

const BACKLOG_PROJECTS_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
    { name : 'Status', type : 'select', args : { fieldName : 'status' } },
    { name : 'Type', type : 'select', args : { fieldName : 'projectType' } },
    { name : 'Action', type : 'button', args : { name : 'To Active', click : null, params  : (f) => ['status', 'active', f, this.app] }  },
];

const backlogProjects = tableDrawer.getState('projectResources').filter(p => { return p.backlog });
tableDrawer.drawTable(BACKLOG_PROJECTS_TABLE, backlogProjects, {dv:dv,app:this.app,instance:this});
```

## Archived
```dataviewjs
const { tableDrawer } = customJS;

const TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
    { name : 'Status', type : 'select', args : { fieldName : 'status' } },
];

const resources = tableDrawer.getState('projectResources').filter(p => { return p.archived});
tableDrawer.drawTable(TABLE, resources, {dv:dv,app:this.app,instance:this});
```

## Done
```dataviewjs
const { tableDrawer } = customJS;

const TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
    { name : 'Status', type : 'select', args : { fieldName : 'status' } },
];

const resources = tableDrawer.getState('projectResources').filter(p => { return p.done});
tableDrawer.drawTable(TABLE, resources, {dv:dv,app:app,instance:this});
```
