---
tags: type/todo {{purpose_tab:text:purpose/}} {{main_topic_tag:text:topic/}}
template-filename: "{{now:currentDate:yyyyMMddHHmm}} {{title}}"
template-replacement: "* [[{{filename}}]]"
template-input: title, now, first_task_list,  purpose_tag, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
up: 
---
# {{title}}
```button
name Add Task
type line(14) template
action task
color blue
```


### {{first_task_list}}}
* [ ] 
