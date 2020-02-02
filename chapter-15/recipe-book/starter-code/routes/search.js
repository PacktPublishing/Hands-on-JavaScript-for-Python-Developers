var express = require('express');
var router = express.Router();

const http = require('http');

require('dotenv').config();

/* GET home page. */
router.get('/', (req, res, next) => {
  http.get(`http://api.edamam.com/search?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}&q=${req.query.q}`, (data) => {
  
    let chunks = '';

    data.on("data", (chunk) => {
      chunks += chunk
    })

    data.on("end", () => {
      res.send(JSON.parse(chunks))
    })

    data.on('error', (e) => {
      console.log("Got error: " + e.message);
    })
  })
});

module.exports = router;
  