#!/bin/bash
REPO_FOLDER='/home/acifuentes/Projects/obsidian_config'
LOCAL_NOTES_FOLDER='/home/acifuentes/Documents/GoogleDrive/Notes'

# Sync Meta folder contents
rm -rf "$REPO_FOLDER/Z-Meta/.*"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/dv-scripts" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/js-scripts" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/custom-js" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/template-journal" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/template-pocket" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/templates-templater" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/vimrc" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/template-buttons" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/template-notes" "$REPO_FOLDER/Z-Meta/"
cp -r "$LOCAL_NOTES_FOLDER/Z-Meta/templates" "$REPO_FOLDER/Z-Meta/"

# Sync PARA Notes
\cp "$LOCAL_NOTES_FOLDER/Areas/Areas.md" "$REPO_FOLDER/Areas/"
\cp "$LOCAL_NOTES_FOLDER/Goals/Goals.md" "$REPO_FOLDER/Goals/"
\cp "$LOCAL_NOTES_FOLDER/Projects/Projects.md" "$REPO_FOLDER/Projects/"
\cp "$LOCAL_NOTES_FOLDER/Resources/Resources.md" "$REPO_FOLDER/Resources/"
rm -rf "$REPO_FOLDER/Index/.*"
cp -r "$LOCAL_NOTES_FOLDER/Index" "$REPO_FOLDER/"

# Sync plugin config
\cp "$LOCAL_NOTES_FOLDER/.obsidian/plugins/quickadd/data.json" "$REPO_FOLDER/.obsidian/plugins/quickadd/data.json"
