const http = require('http');
const https = require('https');
const url = require('url');
require('dotenv').config();

const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
  console.log(req.url)
  const { lat, lng, value } = url.parse(req.url, true).query

  const options = {
    hostname: 'developers.zomato.com',
    port: 443,
    path: `/api/v2.1/search?q=${value}&lat=${lat}&lon=${lng}`,
    method: 'GET',
    headers: {
      'User-Key': process.env.ZOMATO_API_KEY,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  const request = https.request(options, (response) => {
    let data = ''

    response.on('data', d => {
      data += d
    })

    response.on('end', () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(data);
      res.end();
    })

    // response.on('end', (data) => {

    // })

    // response.on('error', (e) => {
    //   console.error(e)
    // })
  })

  request.on('error', (e) => {
    console.error('error', e)
  })

  request.end()
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});