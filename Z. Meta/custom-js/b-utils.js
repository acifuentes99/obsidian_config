class noteUtils {

  getDailyNoteHeader(dv) {
    const currentFile = dv.current().file;
    this.getNavigator(dv, currentFile);
    this.getDayNotes(dv, currentFile);
  }

  getNavigator(dv, currentFile) {
    const dayDifference = dv.date('today').diff(dv.date(currentFile.name), ["days"]).values.days;
    dv.span("`button-prev-daily` `button-next-daily`");
    dv.span(dayDifference + " days from today <br>");
    dv.span("`button-kwka`");
  }

  getDayNotes(dv, currentFile) {
    dv.header(2, "Day Notes");
    const targetDate = dv.date(currentFile.name);
    const query = '-#journal and -"T. Templates" and -"X. Plugins" and -"Z. Meta"'
    const notesWithTimestamp = dv.pages(query)
        .where(p => {
            const fileFrontmatter = p.file.frontmatter;
            if (!fileFrontmatter.timestamp) { return; }
            const noteDate = this.getDVDate(fileFrontmatter.timestamp, dv);
            if (!noteDate) { return; }
            return noteDate.hasSame(targetDate, 'day');
         });
    dv.list(notesWithTimestamp.file.link);
  }

  getDVDate(dateObject, dv) {
      // From c-dateutils.js
      if (!dateObject) {
          return null;
      }
      if (typeof dateObject === 'string') {
        const newDate = dv.date(dateObject);
        if (newDate && 'isLuxonDateTime' in newDate && newDate.isLuxonDateTime) {
          return newDate;
        }
        return null;
      }
      const dateString = dateObject.toString();
      const year = dateString.slice(0,4);
      const month = parseInt(dateString.slice(4,6));
      const day = dateString.slice(6,8);
      const minutes = dateString.slice(8,10);
      const seconds = dateString.slice(10,12);
      return dv.date(year.toString() + '-' + month.toString() + '-' + day.toString());
  }
}
