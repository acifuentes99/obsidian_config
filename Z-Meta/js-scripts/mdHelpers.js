function regexIndexOf(string, regex, startpos) {
    var indexOf = string.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

function regexLastIndexOf(string, regex, startpos) {
    regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if(typeof (startpos) == "undefined") {
        startpos = string.length;
    } else if(startpos < 0) {
        startpos = 0;
    }
    var stringToWorkWith = string.substring(0, startpos + 1);
    var lastIndexOf = -1;
    var nextStop = 0;
    while((result = regex.exec(stringToWorkWith)) != null) {
        lastIndexOf = result.index;
        regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
}

function jumpHeading(isForward) {
	const editor = view.editor;
	let posToSearchFrom = editor.getCursor();
	posToSearchFrom.line += isForward ? 1 : -1;
	const cursorOffset = editor.posToOffset(posToSearchFrom);
	const lookupToUse = isForward ? regexIndexOf : regexLastIndexOf;
	let headingOffset = lookupToUse(editor.getValue(), /^#(#*) /gm, cursorOffset);
	// If not found from the cursor position, try again from the document beginning (or reverse beginning)
	if (headingOffset === -1)
		headingOffset = lookupToUse(editor.getValue(), /^#(#*) /gm);
	const newPos = editor.offsetToPos(headingOffset);
	editor.setCursor(newPos);
}

function insertCharacter(character) {
	const editor = view.editor;
  editor.replaceRange(moment().format("YYYY-MM-DD"));
}
