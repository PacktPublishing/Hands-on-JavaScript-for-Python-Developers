var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const ships = [];
  
  res.render('index', { ships: ships });
});

module.exports = router;
