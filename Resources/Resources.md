---
tags: dashboard
---
# Resources

## Active
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/resource AND !#archive WHERE !contains(file.folder, "template") 
```

## Archived
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/resource AND #archive WHERE !contains(file.folder, "template") 
```