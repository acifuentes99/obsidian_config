---
tags: type/project {{purpose_tag:text:purpose/}} {{main_topic_tag:text:topic/}}
emoji: "{{icon}}"
template-filename: "{{icon}}{{title}}"
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

let query = '#{{main_topic_tag}} and #type/todo';
for (let page of dv.pages(query).sort(p => p.file.name, 'asc')) {
	showLinksAndDataBySection(page)
}
```


## 📃 Notes
```dataview
LIST FROM (#{{main_topic_tag}}) and !(#type/resource or #type/project or #type/todo)
```

## 🗒️ Journal

## 📑 Pulled Resources
