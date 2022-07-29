---
tags: type/project {{purpose_tag:text:purpose/}} {{main_topic_tag:text:topic/}}
emoji: "{{icon}}"
template-filename: "{{title}}"
template-output: Projects
template-replacement: "[[{{filename}}]]"
template-should-replace: "never" 
template-input: title, now, icon, purpose_tag, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
show-cold-tasks: true
show-non-annotated-tasks: true
show-only-high-priority: false
hide-subtasks: true
---

# {{icon}}{{title}}

## :luc_check: Tasks
```dataviewjs
const TWO_WEEKS_BEFORE_TIME = new Date(Date.now() - 12096e5);
const TODAY = new Date(Date.now());
const currentPage = dv.current().file;
let currentTasks = dv.array(new Array());
let coldTasks = dv.array(new Array());
let notAnnotatedTasks = dv.array(new Array());

function getTodoTypePages(links) {
    let pages = new Set();
    for (let link of links) {
    	let page = dv.page(link);
    	if (page.file.tags.includes('#type/todo')){
    		pages.add(dv.page(link));
    	}
    }
    return pages;
}

const hideCompletedSubtasks = (t) => (
{
  ...t, 
  subtasks : [],
  children : []
});

function showLinksAndDataBySection(page) {
	currentTasks = currentTasks.concat(page.file.tasks.where(t => 
        !t.fullyCompleted && 
        (t.created > TWO_WEEKS_BEFORE_TIME) && 
        (t.created < TODAY) &&
        (!currentPage.frontmatter['show-only-high-priority'] || t.priority === 'high')
    ));
	coldTasks = coldTasks.concat(page.file.tasks.where(t => 
        !t.fullyCompleted && (t.created <= TWO_WEEKS_BEFORE_TIME)
    ));
	notAnnotatedTasks = notAnnotatedTasks.concat(page.file.tasks.where(t => 
        !t.fullyCompleted && !t.annotated ));
	if ((currentTasks.length + coldTasks.length + notAnnotatedTasks.length) === 0) { return }
    if (currentPage.frontmatter['hide-subtasks']) {
	    currentTasks.values = currentTasks.values.map(hideCompletedSubtasks);
	    coldTasks.values = coldTasks.values.map(hideCompletedSubtasks);
	    notAnnotatedTasks.values = notAnnotatedTasks.values.map(hideCompletedSubtasks);
    }
}

let links = currentPage.outlinks.path.array();
let pages = getTodoTypePages(links);
for (let page of pages) {
	showLinksAndDataBySection(page)
}

dv.header(4, '🤔 Current tasks')
for (let group of currentTasks.groupBy(t => t.section)) {
	dv.header(5, group.key.subpath)
	dv.taskList(group.rows, false)
}
if (currentPage.frontmatter['show-cold-tasks']) {
    dv.header(4, '🥶 Cold tasks')
    for (let group of coldTasks.groupBy(t => t.section)) {
        dv.header(5, group.key.subpath)
        dv.taskList(group.rows, false)
    }
}
if (currentPage.frontmatter['show-non-annotated-tasks']) {
    dv.header(4, '🥲 Not annotated')
    for (let group of notAnnotatedTasks.groupBy(t => t.section)) {
        dv.header(5, group.key.subpath)
        dv.taskList(group.rows, false)
    }
}
```

### Show Tasks
```button
name Add Task List
type command
action From Template: Tasks
```
* 

## 📃 Notes
```button
name Add Note
type command
action From Template: Note
```
* 

## 🗒️ Journal


## 📑 Pulled Resources
### Resource Links
* 

### View
```dataviewjs 
let links = dv.current().file.outlinks.path.array();
let pages = new Set();
for (let link of links) {
	let page = dv.page(link);
	if (page.file.tags.includes('#type/resource')) {
		pages.add(dv.page(link));
	}
}
for (let page of pages) {
	dv.header(4, page.file.name);
	let outlinks = page.file.outlinks.filter(r => {
		return !links.includes(r.path)
	})
	const markdown = dv.list(outlinks);
}
```