---
tags: type/dashboard
---
```button
name Refresh
type command
action Dataview: Force Refresh All Views and Blocks
```
```dataviewjs
const header = '##+ [^\n]*?Workout log[^\n]*?'

// You can update this to filter as you like - filtering for just your daily notes would be good
//const pages = dv.pages('"-Daily-Notes"').filter(page => page.file.name.includes("2024")).sort(x => x.file.name, 'desc')
const pages = dv.pages('#journal/daily').filter(page => page.file.name.includes("2024")).sort(x => x.file.name, 'desc')

// This regex will return text from the Summary header, until it reaches
// the next header, a horizontal line, or the end of the file
const regex = new RegExp(`\n${header}\r?\n(.*?)(\#\# |\n---|$)`, 's')

for (const page of pages) {
    const file = app.vault.getAbstractFileByPath(page.file.path)
    // Read the file contents
    const contents = await app.vault.read(file)
    // Extract the summary via regex
    const summary = contents.match(regex)
    console.log(summary);
    if (summary) {
        // Output the header and summary
        dv.header(2, "[["+file.basename+"]]")
        dv.paragraph(summary[1].trim())
    }
}
```
