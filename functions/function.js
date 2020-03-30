const axios = require("axios")
const qs = require("qs")

export function handler(event, context, callback) {
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  const { REACT_APP_FLICKR_API_KEY } = process.env
  const URL = `https://www.flickr.com/services/rest/?'?${API_PARAMS}&key=${REACT_APP_FLICKR_API_KEY}`

  console.log("logging event.....", event)
  console.log("Constructed URL is ...", URL)

  const pass = (body) => {callback( null, {
    statusCode: 200,
    body: JSON.stringify(body)
  })}

  const get = () => {
    axios.get(URL)
    .then((response) =>
      {
        console.log(response.data)
        pass(response.data)
      }
    )
    .catch(err => pass(err))
  }
  if(event.httpMethod == 'GET'){
    get()
  };
};