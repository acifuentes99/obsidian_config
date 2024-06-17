#!/bin/bash
OBSIDIAN_NOTES_FOLDER='/home/acifuentes/gdrive/Notes'

obsidian_config_folder="$1"

#cp .obsidian/obsidian_config_folder/plugins/quickadd/data.json $obsidian_config_folder/obsidian_config_folder/plugins/quickadd/data.json
#cp .obsidian/obsidian_config_folder/plugins/dataview/data.json $obsidian_config_folder/obsidian_config_folder/plugins/dataview/data.json
#cp .obsidian/obsidian_config_folder/plugins/periodic-notes/data.json $obsidian_config_folder/obsidian_config_folder/plugins/periodic-notes/data.json
#cp .obsidian/obsidian_config_folder/plugins/auto-note-mover/data.json $obsidian_config_folder/obsidian_config_folder/plugins/auto-note-mover/data.json
#cp .obsidian/obsidian_config_folder/plugins/templater-obsidian/data.json $obsidian_config_folder/obsidian_config_folder/plugins/templater-obsidian/data.json
#cp .obsidian/obsidian_config_folder/plugins/note-refactor-obsidian/data.json $obsidian_config_folder/obsidian_config_folder/plugins/note-refactor-obsidian/data.json



# Sync folders
\cp -R "./C. Dashboards" "$OBSIDIAN_NOTES_FOLDER/"
\cp -R "./T. Templates" "$OBSIDIAN_NOTES_FOLDER/"
\cp -R "./Z. Meta" "$OBSIDIAN_NOTES_FOLDER/"

# Sync plugin config
# \cp "$LOCAL_NOTES_FOLDER/.obsidian/plugins/quickadd/data.json" "$REPO_FOLDER/.obsidian/plugins/quickadd/data.json"
