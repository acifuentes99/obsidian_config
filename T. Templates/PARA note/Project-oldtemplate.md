---
tags:
  - topic/default
  - purpose/default
  - toReview
  - type/project
timestamp: <% tp.frontmatter.timestamp %>
status: active
projectType:
  - default
---
## Project Definition
> [!NOTE] About / Definition links
> *

> [!NOTE]- Done definition
> ### Definition
> *
> ### Actions of done
> *

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

## Notes and Journal
* [[B. Note Box/Notes/projectNotes/<% tp.file.title %> - Notes]]
* [[B. Note Box/Notes/projectNotes/<% tp.file.title %> - Journal]]

```datacorejsx
const ProjectNotes = await dc.require("Z. Meta/datacore/projectNotes.jsx");
return function View() {
    const file = dc.useCurrentFile();
    return <ProjectNotes file={file} />;
}
```

## Web Links
*
<%*  tp.hooks.on_all_templates_executed(async () => { tp.user.replace_file_content(tp, tR) }); %>

