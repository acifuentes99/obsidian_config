---
tags: type/project {{purpose_tag:text:purpose/}} {{main_topic_tag:text:topic/}}
emoji: "{{icon}}"
template-filename: "{{title}}"
template-output: Projects
template-replacement: "* [[{{filename}}]]"
template-should-replace: "never" 
template-input: title, now, icon, purpose_tag, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
---

# {{icon}}{{title}}

## :luc_check: Tasks
```dataviewjs
function showLinksAndDataBySection(page) {
	let all_tasks = page.file.tasks.where(t => !t.fullyCompleted)
	if (all_tasks.length === 0) { return }

	for (let group of all_tasks.groupBy(t => t.section)) {
		dv.header(3, group.key.subpath)
		dv.taskList(group.rows, false)
	}
}

let links = dv.current().file.outlinks.path.array();
let pages = new Set()
for (let link of links) {
	let page = dv.page(link)
	if (page.file.tags.includes('#type/todo')){
		pages.add(dv.page(link))
	}
}

for (let page of pages) {
	showLinksAndDataBySection(page)
}


## 📃 Notes
* 

## 🗒️ Journal
* 

## 📑 Pulled Resources
### Resource Links
* 

### View
```dataviewjs 
let links = dv.current().file.outlinks.path.array();
let pages = new Set()
for (let link of links) {
	let page = dv.page(link)
	if (page.file.tags.includes('#type/resource')){
		pages.add(dv.page(link))
	}
}
for (let page of pages) {
	dv.header(3, page.file.name);
	const markdown = dv.list(page.file.outlinks);
}
```
