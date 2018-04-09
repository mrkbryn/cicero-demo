const api_url = process.env.REACT_APP_CICERO_URL;

export const fetchGetRelationMetadata = () => {
  return fetch(`${api_url}/query/timeseries/metadata`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}

export const fetchVocalization = (command) => {
  let body = JSON.stringify({
    command: command
  })

  let url = `${api_url}/query/new`

  console.log(body)

  return fetch(url, {
    method: 'PUT',
    body,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}
