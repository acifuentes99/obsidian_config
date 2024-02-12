---
tags:
  - type/dashboard
obsidianUIMode: preview
sticker: 1f4d4
show-level-1: true
show-level-2: true
show-level-3: true
show-done: true
---

* Docu : [[Obsidian Proyects Docs]]

```button
name Refresh
type command
action Dataview: Force Refresh All Views and Blocks
```
^button-q0fh

> [!info]- new project?
> ```button
> name New Project
> type command
> action From Template: Project
> ```

> [!NOTE]- Task List
>
> ```dataviewjs
> const { testClass } = customJS;
> const activeProjects = testClass.getState('activeProjects');
>
> await dv.view("Z-Meta/dv-views/project-tasks", { activeProjects: activeProjects });
> ```

> [!NOTE]- Backlog Tasks
>
> ```dataviewjs
> const { testClass } = customJS;
> const resources = testClass.getState('projectResources');
    > await dv.view("Z-Meta/dv-views/project-tasks", { activeProjects: resources.filter(p => { return p.backlog}) });
> ```

## Active

```dataviewjs
const currentPage = dv.current().file;
const { tableDrawer } = customJS;

const getDateFormatted = (dateInteger) => {
    if (!dateInteger) {
        return null;
    }
    let dateString = dateInteger.toString();
    let year = dateString.slice(0,4);
    let month = parseInt(dateString.slice(4,6)) - 1;
    let day = dateString.slice(6,8);
    let minutes = dateString.slice(8,10);
    let seconds = dateString.slice(10,12);
    return new Date(year, month, day, minutes, seconds);
}

let checkIfPARANoteIsArchived = (file) => {
    let isArchived = false;
    let isDone = false;
    let inlinks = [];
    let journals = [];
    const fileData = file.file;
    if (fileData.inlinks.values.length > 0) {
        for (let link of fileData.inlinks.values) {
            let p = dv.page(link.path);
            inlinks.push('[[' + p.file.path + ']]');
        }
    }
    if (fileData.outlinks.values.length > 0) {
        for (let link of fileData.outlinks.values) {
            if (link.path.includes("Y-Journal/RelatedJournal")) {
                journals.push('[[' + link.path + ']]');
            }
        }
    }
    if (fileData.tags.values.includes("#done") || fileData.frontmatter.status === 'done') {
        isDone = true;
    }
    else if (fileData.tags.values.includes("#archive") || fileData.frontmatter.status === 'archive') {
        isArchived = true;
    }
    file.inlinks = inlinks;
    file.archived = isArchived;
    file.done = isDone;
    file.backlog = !isArchived && !isDone && isBacklog(fileData);
    return file;
}

const isBacklog = (file) => {
    if (!file.frontmatter.hasOwnProperty('status')) {
        return true;
    }
    return file.frontmatter.status === 'backlog';
}

let resources = [];
let queryProjects = '-"Z-Meta" and #type/project';
let resultsResources = dv.pages(queryProjects).sort(p => p.file.mday, 'desc');


for (let result of resultsResources) {
    resources.push(checkIfPARANoteIsArchived(result));
}
resources.sort((a, b) => {return b.date - a.date}); //from recent to not recent

const activeProjects = resources.filter(p => { return (!p.archived && !p.done && !p.backlog)});
tableDrawer.setState('activeProjects', activeProjects);
tableDrawer.setState('projectResources', resources);

const ACTIVE_PROJECTS_TABLE = [
    { name : 'File', type : 'link', code : (f) => f.file.path },
    { name : 'Date', type : 'date', code : (f) => f.file.frontmatter.timestamp },
    { name : 'Status', type : 'select', args : { fieldName : 'status' } },
    { name : 'Type', type : 'select', args : { fieldName : 'projectType' } },
    { name : 'Action', type : 'button', args : { name : 'To Backlog', click : null, params  : (f) => ['status', 'active', f, this.app] }  },
];

console.log(activeProjects);
tableDrawer.drawTable(ACTIVE_PROJECTS_TABLE, activeProjects, { dv, app: this.app, instance : this });
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
