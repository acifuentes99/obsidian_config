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

## 🎯 Goals

## ⭐ Favorites

## 📃 Notes
```dataview
LIST FROM (#{{main_topic_tag}}) and #type/notes SORT file.name DESC
```
