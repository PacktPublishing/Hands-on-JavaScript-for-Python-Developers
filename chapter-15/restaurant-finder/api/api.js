const yelp = require('yelp-fusion');
const http = require('http');
const url = require('url');
require('dotenv').config();

const hostname = 'localhost';
const port = 3001;

const client = yelp.client(process.env.YELP_API_Key);


const server = http.createServer((req, res) => {
  const { lat, lng, value } = url.parse(req.url, true).query

  console.log(lat, lng, value)

  client.search({
    term: value,
    latitude: lat,
    longitude: lng,
    categories: 'Restaurants'
  }).then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.write(response.body);
    res.end();
  })
    .catch(e => {
      console.error('error',e)
    })
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });