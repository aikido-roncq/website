import strftime from 'strftime'

const DATE_FORMAT = '%d %b'

export const dateRangeToStr = (startStr, endStr) => {
  const start = new Date(startStr)
  const end = new Date(endStr)

  if (!endStr) {
    return strftime(DATE_FORMAT, start)
  } else if (start.getTime() == end.getTime()) {
    return dateRangeToStr(start)
  } else if (start.getMonth() == end.getMonth()) {
    return strftime('%d', start) + '-' + dateRangeToStr(endStr)
  }

  return dateRangeToStr(start) + ' - ' + dateRangeToStr(endStr)
}
