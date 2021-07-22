import strftime from 'strftime';

const DATE_FORMAT = '%d %b';

export const formatDateRange = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);

  if (!endStr) {
    return strftime(DATE_FORMAT, start);
  } else if (start.getTime() === end.getTime()) {
    return formatDateRange(start);
  } else if (start.getMonth() === end.getMonth()) {
    return strftime('%d', start) + '-' + formatDateRange(endStr);
  }

  return formatDateRange(start) + ' - ' + formatDateRange(endStr);
};

export const formatDate = date => new Date(date).toLocaleDateString();

/**
 * Handle the plural of the singular word passed as a parameter depending on the count
 * @param {Number} count the count
 * @param {String} singular the singular word
 * @returns {String} the singular or plural word, depending on the count
 */
const handlePlural = (count, singular) => (count === 1 ? singular : singular + 's');

/**
 * Get the relative date string of a date from today
 * @param {Date} date the date
 * @returns {string} the relative date string
 */
export const relativeDateString = date => {
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < minute) {
    return `à l'instant`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `il y a ${minutes} ${handlePlural(minutes, 'minute')}`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `il y a ${hours} ${handlePlural(hours, 'heure')}`;
  } else if (diff < day * 2) {
    return `hier`;
  } else if (diff < day * 7) {
    const days = Math.floor(diff / day);
    return `il y a ${days} jours`;
  } else {
    return `le ${formatDate(date)}`;
  }
};
