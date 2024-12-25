async function replace_file_contents (tp, tR) {
    const luxonDateExpression = "yyyy-MM-DDTHH:mm:ss";
    let oldcontent = tp.file.content;
    const currenttimestamp = tp.frontmatter.timestamp;
    oldcontent = oldcontent.replace(/---([\S\s]*?)---\n/, '');

    let newtext = tR.replace("{{fileContent}}", oldcontent);
    const newtimestamp = currenttimestamp != null ? currenttimestamp : tp.date.now(luxonDateExpression);
    newtext = newtext.replace("{{timeStamp}}", newtimestamp);

    var file = app.workspace.getActiveFile();
    app.vault.modify(file, '');
    app.vault.modify(file, newtext);
}

module.exports = replace_file_contents;
