---
tags: type/dashboard
last-days: 500 days
number-results: 80
obsidianUIMode: preview
---
## Notes by Size
* Notas candidatas a necesitar de un Merge
* Link para last-days: https://blacksmithgu.github.io/obsidian-dataview/query/literals/

```dataview
TABLE file.mday, file.size
From "" 
WHERE !contains(file.tags, "journal") OR !contains(file.tags, "type/")
AND !contains(file.folder, "template")
AND file.ctime > (date(today) - dur(this.file.frontmatter.last-days))
SORT file.size asc
LIMIT this.file.frontmatter.number-results
```
