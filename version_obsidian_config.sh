#!/bin/bash
REPO_FOLDER='/home/acifuentes/Projects/obsidian_config'
LOCAL_NOTES_FOLDER='/home/acifuentes/Documents/GoogleDrive/Notes'

# Sync Meta folder contents
rm -rf "$REPO_FOLDER/Z. Meta/.*"
cp -r "$LOCAL_NOTES_FOLDER/Z. Meta" "$REPO_FOLDER"

rm -rf "$REPO_FOLDER/T. Templates/.*"
cp -r "$LOCAL_NOTES_FOLDER/T. Templates" "$REPO_FOLDER"

rm -rf "$REPO_FOLDER/C. Dashboards/.*"
cp -r "$LOCAL_NOTES_FOLDER/C. Dashboards" "$REPO_FOLDER"

# Sync plugin config
\cp "$LOCAL_NOTES_FOLDER/.obsidian/plugins/quickadd/data.json" "$REPO_FOLDER/.obsidian/plugins/quickadd/data.json"
