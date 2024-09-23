class noteUtils {

  getDailyNoteHeader(dv) {
    const currentFile = dv.current().file;
    const dayDifference = dv.date('today').diff(dv.date(currentFile.name), ["days"]).values.days;
    dv.span("`button-prev-daily` `button-next-daily`");
    dv.span(dayDifference + " days from today");
  }

}
