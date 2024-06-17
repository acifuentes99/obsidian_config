---
tags: type/dashboard
last-days: 50 days
number-results: 10
---
## Notes non tagged (or with default)

* Crear dataview aquí
* Link para last-days: https://blacksmithgu.github.io/obsidian-dataview/query/literals/

##### Vista de non tagged notes
```dataview
TABLE file.cday
From "" 
WHERE    
(contains(file.tags, "type/note/default") OR contains(file.tags, "topic/default"))
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

##### Vista hecha anteriormente
```dataview
TABLE file.cday, file.mday, file.size
From "" 
WHERE (   
	(length(file.inlinks) = 0 OR none(filter(file.inlinks, (x) => contains(x.tags, "topic/default"))) OR length(file.tags) = 0) OR (contains(file.tags, "type/note/default")) )
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

Docu del filtro:
* length(file.inlinks) = 0 : El archivo no es referenciado por un padre 
* none(filter(file.inlinks, (x) => contains(x.tags, "topic/default"))) : a lo menos 1 de los padres que lo referencian, tienen el topic/default (no tiene un topico declarado) 
* length(file.tags) = 0 : no tiene tags el archivo
* contains(file.tags, "type/note/default") : El archivo, tiene el tag type/note/default (no tiene una categoría de nota declarada)
