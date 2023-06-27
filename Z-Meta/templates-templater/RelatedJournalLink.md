<%*
let initials = "";
const words = tp.file.title.split(" ");
for (let i = 1; i < words.length; i++) {
  initials += words[i].charAt(0).toUpperCase();
}
const journalFolder = 'Y-Journal/RelatedJournal/Journal ';
const date = tp.file.creation_date("YYYY-MM-DD");
const tf = tp.file.find_tfile(tp.file.title);

//await app.vault.modify(tf, tp.file.content + '\n* [['+journalFolder+date+' '+initials+']]');
await app.vault.modify(tf, tp.file.content + '\n* [['+journalFolder+tp.file.title+']]');
-%>