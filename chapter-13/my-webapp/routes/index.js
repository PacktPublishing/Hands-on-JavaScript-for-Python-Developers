var express = require('express');
var router = express.Router();

const store = require('data-store')({ path: process.cwd() + '/data.json' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: JSON.stringify(Object.entries(store.get()).length > 0 ? store.get() : null) });
});

/* GET sub page. */
router.get('/hello', function(req, res, next) {
  res.render('index', { title: 'Hello! This is a route!' });
});

/* POST to sub page. */
router.post('/hello', function(req, res) {
  store.set('message', { message: `${req.body.message} at ${Date.now()}` })

  res.set('Content-Type', 'application/json');
  res.send(req.body);
});

/* DELETE from json and return to home page */
router.delete('/', function(req, res) {
  store.del(req.body.id);

  res.sendStatus(200);
});

module.exports = router;
