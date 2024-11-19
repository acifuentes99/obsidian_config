class dateUtils {
  getDateFormatted(dateInteger) {
      if (!dateInteger) {
          return null;
      }
      const dateString = dateInteger.toString();
      const year = dateString.slice(0,4);
      const month = parseInt(dateString.slice(4,6)) - 1;
      const day = dateString.slice(6,8);
      const minutes = dateString.slice(8,10);
      const seconds = dateString.slice(10,12);
      return new Date(year, month, day, minutes, seconds);
  }

  getDVDate(dateObject, dv) {
      if (typeof dateObject === 'string') {
        return dv.date(dateObject);
      }
      if (!dateInteger) {
          return null;
      }
      const dateString = dateInteger.toString();
      const year = dateString.slice(0,4);
      //const month = parseInt(dateString.slice(4,6)) - 1;
      const month = parseInt(dateString.slice(4,6));
      const day = dateString.slice(6,8);
      const minutes = dateString.slice(8,10);
      const seconds = dateString.slice(10,12);
      return dv.date(year.toString() + '-' + month.toString() + '-' + day.toString());
  }

  compareTwoDates(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
    );
  }
}
