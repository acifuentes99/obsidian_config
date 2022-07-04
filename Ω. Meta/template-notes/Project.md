---
tags: type/project {{purpose_tag:text:purpose/}} {{main_topic_tag:text:topic/}}
template-filename: "{{now:currentDate:yyyyMMddHHmm}} {{title}}"
template-replacement: "* [[{{filename}}]]"
template-input: title, now, icon, purpose_tag, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
---

# {{title}}

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

let zettelPage = ''
showLinksAndDataBySection(dv.page(zettelPage))
```

## 📃 Notes
```dataview
LIST FROM (#{{main_topic_tag}}) and !(#type/resource or #type/project or #type/todo)
```

## 🗒️ Journal

## 📑 Pulled Resources