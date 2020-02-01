var express = require('express');
var router = express.Router();

require('dotenv').config();

const APPLICATION_ID = process.env.APPLICATION_ID
const APPLICATION_KEY = process.env.APPLICATION_KEY
const API_PATH = "https://api.edamam.com/search"

/* GET tests page. */
router.get('/', function(req, res, next) {
  fetch(`${API_PATH}?app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEY}&q=cheesecake`) 
    .then(data => data.json())
    .then((json) => {
      res.render('tests', { data: json });
    })
});

module.exports = router;