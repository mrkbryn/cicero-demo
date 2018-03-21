const api_url = process.env.REACT_APP_CICERO_URL;

export const fetchGetRelationMetadata = () => {
  return fetch(`${api_url}/query/timeseries/metadata`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}

export const fetchVocalization = (tableName, startDate, endDate) => {
  let body = JSON.stringify({
    tableName: tableName,
    startDate: startDate,
    endDate: endDate,
  });

  let url = `${api_url}/query/timeseries`;

  console.log(body)

  return fetch(url, {
    method: 'PUT',
    body,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}
