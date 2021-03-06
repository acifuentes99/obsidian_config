---
tags: type/area {{main_topic_tag:text:topic/}}
emoji: {{icon}}
template-filename: "{{title}}"
template-output: Areas
template-replacement: "* [[{{filename}}]]"
template-should-replace: "never" 
template-input: title, now, icon, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
up: "[[index]]"
---

# {{icon}} {{title}}

## 📓 Projects
```dataview
LIST FROM (#{{main_topic_tag}}) and #type/project 
```

## 📚 Resources
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
	dv.header(3, page.file.name);
	let outlinks = page.file.outlinks.filter(r => {
		return !links.includes(r.path)
	})
	const markdown = dv.list(outlinks);
}
```

## 🎯 Goals

## ⭐ Favorites

## 📃 Notes
```dataview
LIST FROM (#{{main_topic_tag}}) and #type/notes SORT file.name DESC
```
