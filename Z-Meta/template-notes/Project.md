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

## ✅ Tasks
 ```dataviewjs
dv.view("Z-Meta/dv-scripts/coldTasks");
```
```dataviewjs
dv.view("Z-Meta/dv-scripts/linkReferences");
```
```dataviewjs

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