const request = require('request');

module.exports.metarWeather = (event, _context, callback) => {
  const params = event.queryStringParameters;

  const respond = (statusCode, body) => {
    callback(null, {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: typeof(body) == 'object' ? JSON.stringify(body) : body
    });
  }

  if(params && params.icao) {
    request({
      url: `https://avwx.rest/api/metar/${params.icao}`,
      method: event.httpMethod,
      headers: { 'Authorization': `Token ${process.env.AVWX_TOKEN}` },
    }, (_err, _response, body) => respond(200, body));
  } else {
    respond(400, { error: "You must provide an ICAO in your query." });
  }

};
