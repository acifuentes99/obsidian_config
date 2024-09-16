---
tags:
  - type/resource
  - type/collection
---
# Idea
* 
{{fileContent}}

# MOC
* 

# Notes
* 

# Links
* 

<%*
var file = app.workspace.getActiveFile();
var oldContent = await app.vault.read(file);
oldContent = oldContent.replace(/---[\s\S]*?---\n/, '');

tp.hooks.on_all_templates_executed(async () => {
	var file = app.workspace.getActiveFile();
	const newText = tR.replace("{{fileContent}}", oldContent);
	app.vault.modify(file, '');
	app.vault.modify(file, newText);
});
%>