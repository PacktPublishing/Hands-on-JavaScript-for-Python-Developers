var express = require('express');
var router = express.Router();
const fs = require('fs');

const https = require('https');

require('dotenv').config();

router.get('/', (req, res, next) => {
  https.get(`https://api.edamam.com/search?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}&q=${req.query.q}`, (data) => {

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
  