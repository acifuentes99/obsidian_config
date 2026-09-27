# Obsidian Config

Based on Thomas Frank second brain implementation on Notion (https://www.youtube.com/watch?v=vs8WQh2k-Ow), I decided to try this implementation of 2nd Brain in Obsidian, using mostly tags, and plugins like Dataview, Breadcrumbs, and others

Soon, I'll write about how to use this configuration in Obsidian. For now, the repo includes .obsidian folder (without workspaces), and templates used for plugin Note From Template (https://github.com/mo-seph/obsidian-note-from-template)

## Required Plugins

* The following plugins are needed to make Dashboards on the vault to work. This can be installed on Desktop and Mobile.

* [Datacore](https://github.com/blacksmithgu/datacore "GitHub - blacksmithgu/datacore: Next dataview plugin generation") : Making components to filter notes, querying notes, create tables, dashboards, and other specs (powered by React.js)
* [Quickadd](https://github.com/chhoumann/quickadd "GitHub - chhoumann/quickadd: QuickAdd for Obsidian") : Register custom obsidian commands (por inbox notes)
* [Templater](https://github.com/SilentVoid13/Templater "GitHub - SilentVoid13/Templater: A template plugin for obsidian") - Templates for weekly notes, daily notes, inbox notes
* [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes "GitHub - liamcain/obsidian-periodic-notes: Create/manage your daily, weekly, and monthly notes in Obsidian") : Add weekly notes
* [Buttons](https://github.com/shabegom/buttons "GitHub - shabegom/buttons: Buttons in Obsidian") - For dashboards, add custom actions
* [Metaedit](https://github.com/chhoumann/MetaEdit "GitHub - chhoumann/MetaEdit: MetaEdit for Obsidian") : Edit metadata with scripts (dashboards)

## Claude Code Integration

The `claude/` directory versions the Claude Code ↔ Obsidian integration:

| File | Deploy to |
|---|---|
| `claude/CLAUDE.md-addon.md` | Append the contents to `~/.claude/CLAUDE.md` |
| `claude/commands/obsidian-helper.md` | `~/.claude/commands/obsidian-helper.md` |
| `claude/vault-notes/Claude Skills Extension.md` | `<vault>/B. Note Box/Notes/Claude Skills Extension.md` |
| `claude/vault-notes/Claude Code - Obsidian Integration Guide.md` | `<vault>/A. PARA Notes/Resources/Claude Code - Obsidian Integration Guide.md` |

## All Required Plugins
* Auto Note Mover
* Buttons
* Calendar
* Datacore
* Default New Tab Page
* Excalibrain
* Excalidraw
* Force note view mode
* Hider
* Hover Editor
* Image toolkit
* Kindle Highlihgts (personal)
* Metadata Menu
* MetaEdit (Api)
* Minimal Theme Settings
* Modal Forms
* Mousewheel Image zoom
* Note Refactor
* Pane Relief
* Periodic Notes
* Quick Switcher++
* QuickAdd
* Recent Files
* Sortable
* Style Settings
* Tabs
* Templater
