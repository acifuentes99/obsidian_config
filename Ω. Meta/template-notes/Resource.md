---
tags: type/resource {{purpose_tab:text:purpose/}} {{main_topic_tag:text:topic/}}
emoji: "{{icon}}"
template-filename: "{{now:currentDate:yyyyMMddHHmm}} {{icon}}{{title}}"
template-output: Resources
template-replacement: "* [[{{filename}}]]"
template-should-replace: "never" 
template-input: title, now, icon, purpose_tag, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
---

# {{icon}}{{title}}

## 📃 Notes
```dataview
LIST FROM (#{{main_topic_tag}}) and #type/notes SORT file.name DESC
```

## ️:luc_link: Web Clips
