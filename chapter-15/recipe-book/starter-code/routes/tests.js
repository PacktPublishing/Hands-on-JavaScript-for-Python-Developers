const http = require('http');

require('dotenv').config();

http.get(`http://api.edamam.com/search?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}&q=cheesecake`, (res) => {
  console.log("Got response: " + res.statusCode)

  res.setEncoding('utf8')
  
  res.on("data", (chunk) => {
    console.log(chunk)
  })
}).on('error', (e) => {
  console.log("Got error: " + e.message);
})
