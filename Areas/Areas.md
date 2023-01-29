---
tags: type/dashboard graphstart
obsidianUIMode: preview
---
# Areas

```button
name New Area
type command
action From Template: Area
```
## Active
```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/area AND !#archive WHERE !contains(file.folder, "template") 
```
```
WITHOUT ID link(file.link, Title) AS “Title”
```
## Archived
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/area AND #archive WHERE !contains(file.folder, "template") 
```

## Internal links (for graph)
* [[Tech]]
* [[Social]]
* [[Reflexiones]]
* [[Productivity]]
* [[Life Knowledge]]
* [[Fitness]]
* [[Finanzas]]
* [[Career]]