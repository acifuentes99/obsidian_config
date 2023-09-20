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
name New Project
type command
action From Template: Project
```
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
const { testClass } = customJS;

testClass.printSomething("this");

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
    if (file.inlinks.values.length > 0) {
        for (let link of file.inlinks.values) {
            let p = dv.page(link.path);
            inlinks.push('[[' + p.file.path + ']]');
        }
    }
    if (file.outlinks.values.length > 0) {
        for (let link of file.outlinks.values) {
            if (link.path.includes("Y-Journal/RelatedJournal")) {
                journals.push('[[' + link.path + ']]');
            }
        }
    }
    if (file.tags.values.includes("#done")) {
        isDone = true;
    }
    else if (file.tags.values.includes("#archive")) {
        isArchived = true;
    }
    let object = {
        link : '[[' + file.path + '|' + file.name + ']]',
        file : file,
        inlinks : inlinks,
        archived : isArchived,
        done : isDone,
        journals : journals,
        date : getDateFormatted(file.frontmatter.timestamp),
        backlog : file.tags.values.includes("#backlog")
        //archivedInlinks
        //activeInlinks
    };
    return object;
}


//let drawJournals = (resources, title) => {
//    let text = [];
//    dv.header(1, title + ' (' + resources.length + ')');
//    for (let p of resources) {
//        let asd = '';
//        let emoji = p.file.frontmatter?.emoji == null ? '' : p.file.frontmatter?.emoji;
//        for (let journalLink of p.journals) {
//            asd = asd + emoji + ' ' + journalLink + '<ul>';
//
//        }
//        asd = asd + '</ul>';
//        text.push(asd);
//    }
//    dv.table(['name','extra'], text.map(b => [b, '']));
//}

let resources = [];
let queryProjects = '-"Z-Meta" and #type/project';
let resultsResources = dv.pages(queryProjects).sort(p => p.file.mday, 'desc');

for (let result of resultsResources) {
    resources.push(checkIfPARANoteIsArchived(result.file));
}
resources.sort((a, b) => {return b.date - a.date}); //from recent to not recent

const activeProjects = resources.filter(p => { return (!p.archived && !p.done && !p.backlog)});
testClass.setState('activeProjects', activeProjects);
testClass.setState('projectResources', resources);

testClass.drawProjectList(activeProjects, 'Active', dv, app, this);
//drawJournals(resources.filter(p => { return (!p.archived && p.journals.length > 0)}), 'Journals');
```

## Backlog
```dataviewjs
const { testClass } = customJS;
const resources = testClass.getState('projectResources');
testClass.drawProjectList(resources.filter(p => { return p.backlog}), 'Backlog', dv, app, this);
```

## Archived
```dataviewjs
const { testClass } = customJS;
const resources = testClass.getState('projectResources');
testClass.drawProjectList(resources.filter(p => { return p.archived}), 'Archived', dv, app, this);
```

## Done
```dataviewjs
const { testClass } = customJS;
const resources = testClass.getState('projectResources');
testClass.drawProjectList(resources.filter(p => { return p.done}), 'Done', dv, app, this);
```
