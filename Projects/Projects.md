---
tags: type/dashboard
---
# Projects

```button
name New Project
type command
action From Template: Project
```

## Active
```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/project AND !#archive WHERE !contains(file.folder, "template") 
```

## Archived
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/project AND #archive WHERE !contains(file.folder, "template") 
```