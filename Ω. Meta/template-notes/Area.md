---
tags: type/area {{main_topic_tag:text:topic/}}
emoji: {{icon}}
template-output: index
template-filename: "{{title}}"
template-replacement: "* [[{{filename}}]]"
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
```dataview
LIST FROM (#{{main_topic_tag}}) and #type/resource
```

## 🎯 Goals

## ⭐ Favorites

## 📃 Notes
```dataview
LIST FROM (#{{main_topic_tag}}) and #type/notes SORT file.name DESC
```
