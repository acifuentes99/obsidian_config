function showLinksAndDataBySection(page) {
	let all_tasks = page.file.tasks.where(t => !t.fullyCompleted)
	if (all_tasks.length === 0) { return }

	for (let group of all_tasks.groupBy(t => t.section)) {
		dv.header(4, group.key.subpath)
		dv.taskList(group.rows, false)
	}
}

let links = dv.current().file.outlinks.path.array();
let pages = new Set()
for (let link of links) {
	let page = dv.page(link)
	if (page.file.tags.includes('#type/todo')){
		pages.add(dv.page(link))
	}
}

for (let page of pages) {
	showLinksAndDataBySection(page)
}
