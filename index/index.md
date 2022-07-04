---
icon: teddy_bear
tags: type/list, purpose/organizing, topic/notetaking/index, status/prod
---
# 🧸 Index

## 😱 Areas
```dataview
LIST join([emoji, file.name], " ") FROM #type/area where !contains(file.folder, "template-notes")
```
## 📔 Current Projects
```dataview
TABLE file.etags AS "Tags" FROM #type/project WHERE !contains(file.folder, "template") 
```

## 📆 Weekly Notes
```dataview
TABLE last-one as "Last One" FROM #journal/weekly WHERE !contains(file.folder, "template-journal") SORT file.name DESC LIMIT 7
```

## Shortcuts

| leader + i              | Index                               |
|-------------------------|-------------------------------------|
| leader + j              | Jounral                             |
| leader + w + leader + w | Entrada Journal de hoy              |
| leader + w + leader + i | Actualizar index de Journal         |
| ctrl + up               | Entrada Journal dia anterior        |
| ctrl + down             | Entrada Journal dia siguiente       |
| leader + nz             | Nuevo zettlekasten                  |
| alt + l                 | Añadir link a zettlekasten          |
| :VimwikiTable           | Añadir Tabla                        |
| Enter (insert mode)     | Añadir fila / ir hacia abajo        |
| Tab (insert mode)       | Añadir columna / ir a la derecha    |
| leader + p              | Proyectos                           |
| S* (visual mode)        | Enegrecer/Destacar texto en V.block |

## Markdown
_This text will be italic_, *this too*
**This text will be bold**, __this too__
~~This text will be striked~~

Más shortcuts : https://gist.github.com/drkarl/4c503bccb62558dc85e8b1bc0f29e9cb
Mindmap de acciones y core values: https://coggle.it/diagram/X8OnH1JoLAJ78l_n/t/-
