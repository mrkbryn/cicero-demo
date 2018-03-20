var MONTH_YEAR_REGEX = /(january|february|march|april|may|june|july|august|september|october|november|december) ([0-9]{4})/g;

export const parseDates = transcript => {
  // TODO: use other REGEX to detect date speech patterns, i.e. "during 2012", "from 2012 to 2013"
  var match = transcript.match(MONTH_YEAR_REGEX);
  let result = [undefined, undefined]
  if (match) {
    if (match.length === 1) {
      result[0] = new Date(match[0])
    } else {
      var d1 = new Date(match[match.length-1]);
      var d2 = new Date(match[match.length-2]);
      result[0] = d1 < d2 ? d1 : d2
      result[1] = d1 < d2 ? d2 : d1
    }
  }
  return result;
}
