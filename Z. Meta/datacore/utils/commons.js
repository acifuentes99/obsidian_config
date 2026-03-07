/* COMMONS USED FOR DATACORE IN OBSIDIAN
 *  collects utiliary functions, for using with datacore in multiple
 *  obsidian dashboards or components
 */
return {
    openFileInLine: async (file) => {
        const filePath = file.$file; // Relative path within the vault
        const lineNumber = file.$line; // The line number you want to jump to
        const fileInstance = app.vault.getAbstractFileByPath(filePath);

        const leaf = app.workspace.getLeaf(false); // true for a new leaf, false for active
        leaf.openFile(fileInstance);

        setTimeout(() => {
            const editor = leaf.view.editor;
            if (editor) {
                editor.setCursor({ line: lineNumber, ch: 0 }); // line numbers are 0-indexed in CodeMirror
                const offset = 1;
                let edFrom = editor.getCursor('from');
                let edTo = editor.getCursor('to');
                edFrom.line += offset; edTo.line += offset;
                editor.scrollIntoView( {from: edFrom, to: edTo}, true );
            }
        }, 100); // Small delay to ensure editor is ready
    }
    ,
    getEmojiPrefix: (pFile, hasLinks) => {
        let l = '';
        if (pFile.$tags.includes('#type/project')) {
            l = '🧮🎲';
        }
        else if (pFile.$tags.includes('#type/resource')) {
            l = '🧮📚';
        }
        else if (pFile.$tags.includes('#type/area')) {
            l = '🧮🤩';
        }
        else if (pFile.$tags.includes('#type/note/contact')) {
            l = '💁‍♂️';
        }
        else if (pFile.$tags.includes('#type/note/checklist')) {
            l = '✔️';
        }
        else if (pFile.$tags.includes('#type/note/brainstorm')) {
            l = '🧠';
        }
        else if (pFile.$tags.includes('#type/note/documentation')) {
            l = '💡';
        }
        else if (pFile.$tags.includes('#type/note/list')) {
            l = '🗒';
        }
        else if (pFile.$tags.includes('#type/note/research')) {
            l = '🔍';
        }
        else if (pFile.$tags.includes('#type/note/study')) {
            l = '📐';
        }
        else if (pFile.$tags.includes('#type/note/summary')) {
            l = '🧾';
        }
        else if (pFile.$tags.includes('#type/note/thoughts')) {
            l = '🤔';
        }
        else if (pFile.$tags.includes('#type/note/articlenote')) {
            l = '📝';
        }
        else if (pFile.$tags.includes('#type/note/book')) {
            l = '📗';
        }
        else if (pFile.$tags.includes('#type/note/experience')) {
            l = '🧾';
        }
        else {
            l = '❓';
        }
        return l;
    }
    ,
    getTimestamp: (dc, row) => {
        if (!row || !row?.$frontmatter?.timestamp) {
            return null;
        }
        const timestampValue = row.$frontmatter?.timestamp.value;
        if (dc.coerce.date(timestampValue)) {
            return timestampValue;
        }
        let dateString = timestampValue.toString();
        dateString =
            dateString.substring(0,4) + '-' +
            dateString.substring(4,6) + '-' +
            dateString.substring(6,8);
        return dc.coerce.date(dateString);
    }
}
