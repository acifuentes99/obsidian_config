```dataviewjs
const fileNameasdf = dv.file.title;
const fileName = "B. Note Box/Notes/" + fileNameasdf + " - Tasks";

if (page && page.file && pafe.file.tasks.values.length > 0) {
	dv.table(["Task","Completed"], page.file.tasks.map(task => {
		[task.text, task.completed]
	}));
}
```

