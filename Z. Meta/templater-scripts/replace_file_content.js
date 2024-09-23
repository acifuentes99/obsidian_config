async function replace_file_contents (tp, tR) {
    let oldcontent = tp.file.content;
    const currenttimestamp = tp.frontmatter.timestamp;
    oldcontent = oldcontent.replace(/---([\S\s]*?)---\n/, '');
    console.log(oldcontent);

    let newtext = tR.replace("{{fileContent}}", oldcontent);
    const newtimestamp = currenttimestamp != null ? currenttimestamp : tp.date.now('yyyy-mm-ddthh:mm:ss');
    newtext = newtext.replace("{{timeStamp}}", newtimestamp);

    var file = app.workspace.getActiveFile();
    app.vault.modify(file, '');
    app.vault.modify(file, newtext);
}

module.exports = replace_file_contents;
