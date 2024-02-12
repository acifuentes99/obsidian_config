module.exports = (params) => {
    // obsidian is the API
  const {quickAddApi: {inputPrompt}} = params;

	const ed = app.workspace.activeEditor.editor;
  let dayBreaks = ed.searchCursor('-----').findAll();
  let currentWeek = moment().day();
  let cursor;
  if (currentWeek === 5) { //Sabado
    cursor = ed.getCursor();
    cursor['line'] = ed.lineCount();
  }
  else if (currentWeek === 6) { //Domingo
    cursor = dayBreaks[1].from; //Saltar a breakline correspondiente
    cursor['line'] = cursor['line'] - 2;
  }
  else { //Resto de semana
    cursor = cursor = dayBreaks[currentWeek + 1].from; //Saltar a breakline correspondiente
    cursor['line'] = cursor['line'] - 2;
  }
  ed.setCursor(cursor);
  // var lineNum = ed.getCursor().line;
  // var charCoords = ed.charCoords(new Pos(lineNum, 0), 'local');
  // var height = ed.getScrollInfo().clientHeight;
  // var y = charCoords.top;
  // y = charCoords.bottom - height / 2;
  // ed.scrollTo(null, y);
}
