---
tags: dashboard
last-days: 50 days
number-results: 50
---

## To be moved to folder

* Crear dataview aquí
* Link para last-days: https://blacksmithgu.github.io/obsidian-dataview/query/literals/
* Muestra : 


```dataview
TABLE file.cday, file.mday, file.size
From "" 
WHERE (   
	(length(file.inlinks) = 0 OR none(filter(file.inlinks, (x) => contains(x.tags, "type/"))) OR length(file.tags) = 0) )
AND !contains(file.tags, "journal")
AND !contains(file.tags, "archive")
AND !contains(file.tags, "dashboard")
AND !contains(file.tags, "type/resource")
AND !contains(file.tags, "type/goals")
AND !contains(file.tags, "type/area")
AND !contains(file.tags, "type/project")
AND !contains(file.folder, "template")
AND file.ctime > (date(today) - dur(this.file.frontmatter.last-days))
SORT file.mtime desc
LIMIT this.file.frontmatter.number-results
```


```dataview
LIST WITHOUT ID "[" + file.name + "]]"
From "" 
WHERE (   
	(length(file.inlinks) = 0 OR none(filter(file.inlinks, (x) => contains(x.tags, "type/"))) OR length(file.tags) = 0) )
AND !contains(file.tags, "journal")
AND !contains(file.tags, "archive")
AND !contains(file.tags, "dashboard")
AND !contains(file.tags, "type/resource")
AND !contains(file.tags, "type/goals")
AND !contains(file.tags, "type/area")
AND !contains(file.tags, "type/project")
AND !contains(file.folder, "template")
AND file.ctime > (date(today) - dur(this.file.frontmatter.last-days))
SORT file.mtime desc
LIMIT this.file.frontmatter.number-results
```