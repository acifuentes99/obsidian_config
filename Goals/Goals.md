[[Fitness Goals]]---
tags: type/dashboard
---
# Goals
```button
name New Goal
type command
action From Template: Goal
```
## Active
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/goal")) AS "Tags" FROM #type/goal AND !#archive WHERE !contains(file.folder, "template") 
```

## Archived
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/goal")) AS "Tags" FROM #type/goal AND #archive WHERE !contains(file.folder, "template") 
```