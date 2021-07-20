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
