# Useful commands

* This file will have some useful commands, to apply in notes, for mass renaming, or bulk file sustituion

## Sed
* For replacing in lot of files. In this case, will be an example for Daily notes. Hanging buttons, to use dataviewJs

`sed -i 's/`button-prev-daily` `button-next-daily`/```dataviewjs\\nconst { noteUtils } = customJS;\\nnoteUtils.getDailyNoteHeader(dv);\\n```\\n/g' ./*`
