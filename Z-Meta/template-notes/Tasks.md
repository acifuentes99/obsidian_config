---
tags: type/todo {{main_topic_tag:text:topic/}}
template-filename: "{{now:currentDate:yyyyMMddHHmm}} {{currentTitle}}{{title:text:aaa}} Tasks"
template-replacement: "[[{{filename}}]]"
template-should-replace: "always" 
template-input: title, now, first_task_list, main_topic_tag
zettel-prefix: "{{now:currentDate:yyyyMMddHHmm}}"
up: 
---
# {{currentTitle}}{{title}} Tasks
```button
name Add Task
type line(14) template
action task
color blue
```


### {{first_task_list}}}
* [ ] 
