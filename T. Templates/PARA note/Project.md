---
tags:
  - topic/default
  - purpose/default
  - toReview
  - type/project
timestamp: {{timeStamp}}
status: active
projectType:
  - default
---
## Done Definition
*
{{fileContent}}

## Tasks
```dataviewjs
const fileNameasdf = dv.current().file.name;
const file = "B. Note Box/Notes/projectTasks/" + fileNameasdf + " - Tasks.md";
const page = dv.page(file);

if (page && page.file && page.file.tasks.values.length > 0) {
	dv.table(["Task","Completed"], page.file.tasks.map(task =>
		[task.text, task.completed]
	));
}
else {
	dv.paragraph("No tasks in current Project");
}
```
* Task note: [[B. Note Box/Notes/projectTasks/<% tp.file.title %> - Tasks]]

## Notes
*

## MOC / Links
*

## Web Links
*
<%*  tp.hooks.on_all_templates_executed(async () => { tp.user.replace_file_content(tp, tR) }); %>
