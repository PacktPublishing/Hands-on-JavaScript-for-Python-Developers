var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var store = require('data-store')({ path: process.cwd() + '/users.json' });
  res.render('index', { users: store.get('users')});
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

module.exports = router;
