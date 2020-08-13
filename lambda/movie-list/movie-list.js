const fetch = require('node-fetch')
/** Example request and event object:
      request =  /lambda?query=1234ABCD.
      event = {
        "httpMethod": "GET",
        "path": "/lambda",
        "queryStringParameters": {
            "query": "1234ABCD"
        },
      }
      refer to: 
      - https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
      - https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 */
exports.handler = async function(event, context) {
  if (!process.env.OMDB_KEY) {
    return {
      statusCode: 500,
      body: 'process.env.OMDB_KEY must be defined',
    }
  }
  const API_KEY = process.env.OMDB_KEY
  try {
    const { s: searchTerm, page } = event.queryStringParameters 
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=${API_KEY}`
    const response = await fetch(URL, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
