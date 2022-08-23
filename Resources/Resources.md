---
tags: type/dashboard
---
# Resources

```button
name New Resource
type command
action From Template: Resource
```
## Active
```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.path + "|" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/resource AND !#archive WHERE !contains(file.folder, "template") 
```

## Archived
```dataview
TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.path + "|" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/resource AND #archive WHERE !contains(file.folder, "template") 
```