<%*
const {update} = this.app.plugins.plugins["metaedit"].api
const date = tp.date.now("YYYY-MM-DD");
let dateArray = tp.frontmatter.date;
if ((dateArray) === null) {
	dateArray = date;
}
else if (!dateArray.includes(date)) {
	dateArray = dateArray + ',' + date;
}

const weekday = tp.date.now("e");
const weekdayToName = {
"0" : "Domingo",
"1" : "Lunes",
"2" : "Martes",
"3" : "Miercoles",
"4" : "Jueves",
"5" : "Viernes",
"6" : "Sabado",
};
const text = '## ' + weekdayToName[weekday] + ' (' + date + ')\n\n* \n\n-----\n';
const tf = tp.file.find_tfile(tp.file.title);
await app.vault.modify(tf, tp.file.content + text);
await update('date', dateArray, tf);
tp.file.cursor(10);
-%>