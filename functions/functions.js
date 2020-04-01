import fetch from "node-fetch";

const API_ENDPOINT = `https://www.flickr.com/services/rest/?${process.env.REACT_APP_FLICKR_API_KEY}`;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.joke
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};