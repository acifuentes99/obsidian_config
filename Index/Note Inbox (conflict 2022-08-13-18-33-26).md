---
tags: type/dashboard
last-days: 50 days
number-results: 50
---
## Notes not linked

-   [202208112256 Salesforce Apex Superbadge]]
-   [202208112040 AWS EKS (Kubernetes) Primer]]
-   [202208091935 Amazon Elasctic Container Service ECS Primer]]
-   [202208091921 Deep Dive on Container Security]]
-   [202208091831 AWS ECS Workshop]]
-   [202208091831 Avance AWS en la mañana]]
-   [202208061436 Wants - v2, ojala más estable D]]
-   [202207311232 Introspeccion domingo am]]
-   [202208061852 Configuración PC con Linux Autostart]]
-   [202208061752 Obsidian minimal Cosas interesantes a hacer]]
-   [202208061611 Ideas for Obsidian plugins]]
-   [202208061550 Default applications on Linux]]
-   [202101011457-Why]]
-   [202208041851 Obsidian plugins obsidian db folder]]
-   [202207312307 Postcomentario interesante de getdisciplined en reddit]]
-   [202207312306 Obsaidian reddit interesting links]]
-   [202207312306 Avance Baile]]
-   [202208061419 Sueño, o cosa que tuve, o que pensé]]
-   [202208042322 Shortcuts]]
-   [202208041850 Credenciales Bigg app]]
-   [202208022329 Pagos transferencias Junio]]
-   [202208022329 Video youtube likeability]]
-   [202207312004 Diagrama de Framework Ingesta de información]]
-   [202207311859 Tema, para sicnronización Google Drive]]
-   [202207311401 Bloques de día para asignar tasks de todoist (MVP1)]]
-   [202207310120 Grive Tema de la sincronización]]
-   [202206261333 weekend reflection Repaso values ideas]]
-   [2206292236 Compras AliExpress]]
-   [202207172214 Apuntes video Nueva Constitución]]
-   [202207140729 Solicitud Metlife]]
-   [202207041942 Dia de Pagos]]
-   [202207041940 Reclamo París polera polo]]
-   [202207041853 Refleixones post Retro]]
-   [202207040017 Building a Second Brain]]
-   [4 Steps to Effective Book Summaries with Mind Maps]]
-   [A Builder's Guide to Note-Taking 2]]
-   [How to Take Notes While Reading]]
-   [How to take notes while reading a book]]
-   [Obsidian]]
-   [Obsidian Understanding its Core Design Principles]]
-   [How to Effectively Read and Implement Books]]
-   [Speed Reading, the Asian Efficiency Way]]
-   [How Should Your Cross-Training Shoes Fit Cross-Training Shoe Size Guide]]
-   [Stop Using Velocity To Measure Your Teams]]
-   [How To Read Technical Books Effectively]]
-   [202207021254 Desktop Environment Tasks]]

* Crear dataview aquí
* Link para last-days: https://blacksmithgu.github.io/obsidian-dataview/query/literals/
```dataview
TABLE file.mday, file.size
From "" 
WHERE (   
	(length(file.inlinks) = 0 OR none(filter(file.inlinks, (x) => contains(x.tags, "type/"))) OR length(file.tags) = 0) )
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


```dataview
LIST WITHOUT ID "[" + file.name + "]]"
From "" 
WHERE (   
	(length(file.inlinks) = 0 OR none(filter(file.inlinks, (x) => contains(x.tags, "type/"))) OR length(file.tags) = 0) )
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