const api_url = process.env.REACT_APP_CICERO_URL;

export const fetchGetRelationMetadata = () => {
  return fetch(`${api_url}/query/timeseries/metadata`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}

export const fetchVocalization = (table, startDate, endDate) => {
  let body = JSON.stringify({
    relationName: table.tableName,
    startDate: startDate,
    endDate: endDate,
  });

  let url = `${api_url}/query/timeseries`;

  return fetch(url, {
    method: 'PUT',
    body,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  // .then(response => response.json())
  // .then(json => {
  //   if (json.error) {
  //     this.setState({ fetchResult: { fetching: false, error: json.message }});
  //   } else {
  //     this.setState({ fetchResult: { fetching: false }});
  //
  //     if (this.state.mode === 'vocalization') {
  //       this.handleVocalizationResult(json);
  //     } else if (this.state.mode === 'sonification') {
  //       this.handleSonificationResult(json);
  //     } else if (this.state.mode === 'visualization') {
  //       this.handleVisualizationResult(json);
  //     }
  //   }
  // })
  // .catch(error => {
  //   console.log(error);
  //   this.setState({ fetchResult: { fetching: false, error: 'We were unable to connect to CiceroDB' }});
  // });
}
