const monthDisplays = [
  "Jan", "Feb", "March", "Apr", "May",
  "Jun", "Jul", "Aug", "Sept", "Oct",
  "Nov", "Dec"
];

export const getMonthDisplayForIndex = (index) => {
  return monthDisplays[index];
}

export const getDateStringFromRangeValue = (value) => {
  // Note: the conversion is hardcoded for the specific Bitcoin scenario. To make
  // this dynamic, the earliest data (i.e. the time for range value 0) should be
  // passed to this function
  let month = (value % 12) + 1;
  let formattedMonth = ("0" + month).slice(-2);
  let year = 2011 + Math.trunc(value / 12);
  return `${year}-${formattedMonth}-01`; // yyyy-MM-dd
}
