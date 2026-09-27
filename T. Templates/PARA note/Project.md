---
tags:
  - topic/default
  - purpose/default
  - toReview
  - type/project
timestamp: <% tp.frontmatter.timestamp %>
status: active
projectType:
  - default
---
## Project Definition
> [!info] About / Definition links
> *

> [!done]- Done definition
> ### Definition
> *
> ### Actions of done
> *

{{fileContent}}

## Tasks

## Notes and Journal
* [[B. Note Box/Notes/projectNotes/<% tp.file.title %> - Notes]]
* [[B. Note Box/Notes/projectNotes/<% tp.file.title %> - Journal]]

```datacorejsx
const ProjectNotes = await dc.require("Z. Meta/datacore/projectNotes.jsx");
return function View() {
    const file = dc.useCurrentFile();
    return <ProjectNotes file={file} />;
}
```
