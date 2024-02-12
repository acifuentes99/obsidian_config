---
tags: type/area {{main_topic_tag:text:topic/}}
emoji:
  "{ icon }": 
template-filename: "{{title}}"
template-output: Areas
template-replacement: "[[{{filename}}]]"
template-should-replace: never
template-input: title, now, icon, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
up: "[[Index]]"
---

# {{icon}} {{title}}

## 📓 Projects
```button
name Add Project
type command
action From Template: Project
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
```button
name Add Goal
type command
action From Template: Goal
```
* 


## ⭐ Favorites

## 📃 Notes
```button
name Add Note
type command
action From Template: Note
```
* 

## View
```dataviewjs
dv.view("Z-Meta/dv-scripts/linkReferences");
```