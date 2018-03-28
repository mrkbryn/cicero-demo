let MONTH_YEAR_REGEX = /(january|february|march|april|may|june|july|august|september|october|november|december) ([0-9]{4})/g;
// let TWO_YEAR_REGEX = /[0-9{4}] [0-9]/g;

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

/**
 * Searches a transcript to see if any table keywords appear
 */
export const parseTableName = (transcript, tables) => {
  for (var i = 0; i < tables.length; i++) {
    let table = tables[i]
    for (var j = 0; j < table.keywords.length; j++) {
      if (transcript.indexOf(table.keywords[j]) !== -1) {
        return table.tableName
      }
    }
  }
  return undefined
}

export const parseTranscript = (transcript, tables) => {
  // let lowered = transcript.toLowerCase()
  // if (transcript.includes("reset transcript")) {
  //   this.props.resetTranscript()
  // } else {
  //   let tableName = this.parseTableName(transcript)
  //   let dates = parseDates(transcript)
  //   // TODO: update state...
  //   if (tableName && dates[0] && dates[1]) {
  //     this.fetchVocalizationFromBackend(tableName, dates[0], dates[1])
  //   }
  // }
}
