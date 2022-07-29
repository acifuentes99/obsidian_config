---
tags: type/goal {{main_topic_tag:text:topic/}}
emoji: "{{icon}}"
template-filename: "{{title}}"
template-output: Goals
template-replacement: "[[{{filename}}]]"
template-should-replace: "always" 
template-input: title, now, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
---

# {{icon}}{{title}}


## 🔥 Milestones
```dataviewjs
function showLinksAndDataBySection(page) {
	let all_tasks = page.file.tasks.where(t => !t.fullyCompleted)
	if (all_tasks.length === 0) { return }

	for (let group of all_tasks.groupBy(t => t.section)) {
		dv.header(4, group.key.subpath)
		console.log(group.rows)
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
```
* [ ] 


## 🌱 Goal Projects
```button
name Add Project
type command
action From Template: Project
```
* 


## ✍️ Journal
* 
