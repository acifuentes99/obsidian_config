---
tags: type/resource {{purpose_tab:text:purpose/}} {{main_topic_tag:text:topic/}}
template-filename: "{{now:currentDate:yyyyMMddHHmm}} {{title}}"
template-replacement: "* [[{{filename}}]]"
template-input: title, now, icon, purpose_tag, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
---

# {{title}}

## 📃 Notes
```dataview
LIST FROM (#{{main_topic_tag}}) and #type/notes SORT file.name DESC
```

## ️:luc_link: Web Clips
