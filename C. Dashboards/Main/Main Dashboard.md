---
tags:
  - type/dashboard
timestamp: 2026-05-09T10:23:02
---

## Notes
```datacorejsx
const DailyNotes = await dc.require("Z. Meta/datacore/dailyNotes.jsx");
return function View() {
    const currentFile = dc.useCurrentFile();
    return <DailyNotes filepath={currentFile.$path} file={currentFile} />;
}
```

* https://www.udemy.com/personal/home/

## Journal

* [ ] Put a summary of journals

## Index

`button-daily` `button-weeklynote`
`button-inboxnotenotitle` `button-fastnote`

> [!EXAMPLE]- Dashboards
> * Dataview
> 	* [[Note Inbox]]
> 	* [[Collection Inbox]]
> 	* [[Notes and Tags by Recent]]
> 	* [[Note and Tags By Recent Datacore Version|Notes and Tags by Recent Datacore version]]
> 	* [[Notes by Size]]
> * Quick Links
> 	* [[Oficial Capture List]]
> * Journal
> 	* [[Fast Notes]]
> 	* [[Notes from Daily Notes]]
> 	* [[C. Dashboards/From Daily Note/Journal]]
> * NoteType
> 	* [[Book]]
> 	* [[Contacts|👥 Contacts]]
> 	* [[Checklists|✔️ Checklists]]
> 	* [[Brainstorms|🧠 Brainstorms]]
> 	* [[Documentations|💡 Documentations]]
> 	* [[Lists|🗒 Lists]]
> 	* [[Researchs|🔍 Researchs]]
> 	* [[Studies|📐 Studies]]
> 	* [[Summaries|🧾 Summaries]]
> 	* [[Thoughts|🤔 Thoughts]]
> 	* [[C. Dashboards/NoteType/Journal|😵‍💫Journal]]
> 	* [[Article Notes|📝 Article notes]]

> [!TLDR]+ ✍🏼 Projects
> [[C. Dashboards/Main/Projects|✍ All Projects]]
> ```datacorejsx
> const ProjectsTable = await dc.require("Z. Meta/datacore/projectsTable.jsx");
> return function View() {
>     return <ProjectsTable />;
> }
> ```

> [!TLDR]- 📚 Resources
> [[C. Dashboards/Main/Resources|📚 All Resources]]
> ```dataviewjs
> // Get all notes with the tag "resource"
> let pages = dv.pages("#type/resource");
> const { tableDrawer } = customJS;
>
> // Sort the pages by the "timestamp" property in ascending order
> pages = pages.sort(p => tableDrawer.getTimestamp(p, dv), 'desc').limit(20);
>
> // Render the table
> dv.table(
>     ["File Name", "Timestamp"],
>     pages.map(p => [p.file.link, tableDrawer.getTimestamp(p, dv)])
> );
> ```

> [!TLDR]- 😅 Areas
> [[C. Dashboards/Main/Areas|😅 All Areas]]
>
> ```dataview
> TABLE WITHOUT ID file.frontmatter.emoji + "[[" + file.name + "]]" AS "name", filter(file.etags, (x) => contains(x, "#type/topic")) AS "Tags" FROM #type/area AND !#archive WHERE !contains(file.folder, "template")
> ```

* [ ] : Todo: Migrate this to datacore

> [!HINT]+ Vault Info
> - 🗄️ Recent file updates
>  `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(4).file.link)`
> - 🔖 Tagged:  favorite
>  `$=dv.list(dv.pages('#favorite').sort(f=>f.file.name,"desc").limit(4).file.link)`
> - 〽️ Stats
> 	-  File Count: `$=dv.pages().length`
> 	-  Personal recipes: `$=dv.pages('"Family/Recipes"').length`
