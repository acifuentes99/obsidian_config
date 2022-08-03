---
tags: dashboard
---
# Notes

## Active
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/note AND !#archive AND !#journal WHERE !contains(file.folder, "template") LIMIT 25
```

## Archived
```dataview
TABLE filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/note AND #archive WHERE !contains(file.folder, "template") LIMIT 25
```