const getDateFormatted = (dateInteger) => {
    if (!dateInteger) {
        return null;
    }
    let dateString = dateInteger.toString();
    let year = dateString.slice(0,4);
    let month = parseInt(dateString.slice(4,6)) - 1;
    let day = dateString.slice(6,8);
    let minutes = dateString.slice(8,10);
    let seconds = dateString.slice(10,12);
    return new Date(year, month, day, minutes, seconds);
}

exports.getDateFormatted = getDateFormatted;
