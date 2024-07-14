#!/bin/bash

overwrite_file() {
  echo "Overwriting $1 config"
  \cp "./obsidian_plugins/$1/data.json" "${OBSIDIAN_CONFIG_FOLDER}/plugins/$1/data.json"
}

overwrite_files () {
  overwrite_file quickadd
  overwrite_file templater-obsidian
  overwrite_file note-refactor-obsidian
  echo "done!"
}

if [[ -z "${OBSIDIAN_CONFIG_FOLDER}" ]]; then
    echo "Add OBSIDIAN_CONFIG_FOLDER environment variable into the shell. it should end with '.obsidian.<DEVICE>', and be inside the Notes folder."
else
    overwrite_files
fi
