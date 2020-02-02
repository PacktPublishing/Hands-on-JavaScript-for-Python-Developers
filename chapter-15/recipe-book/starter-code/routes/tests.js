const http = require('http');

require('dotenv').config();

http.get(`http://api.edamam.com/search?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}&q=cheesecake`, (res) => {
  console.log("Got response: " + res.statusCode)

  res.setEncoding('utf8')
  
  let chunks = ''

  res.on("data", (chunk) => {
    chunks += chunk
  })

  res.on("end", () => {
    console.log(JSON.parse(chunks))
  })
}).on('error', (e) => {
  console.log("Got error: " + e.message);
})
