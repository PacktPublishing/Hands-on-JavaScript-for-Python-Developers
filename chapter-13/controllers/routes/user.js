var express = require('express');
var router = express.Router();
var store = require('data-store')({ path: process.cwd() + '/users.json' });

/* GET user. */
router.get('/:user', function(req, res, next) {
  res.send(store.get('user')[req.params.user]);
});

/* POST user. */
router.post('/', function(req, res, next) {
  fetch('https://randomuser.me/api/', (data) => {

  });

  store.union('users', { id: Date.now(), username: req.body.username, fullname: req.body.name });
  res.sendStatus(200);
});

/* DELETE user. */
router.delete('/:user', function(req, res, next) {
  let users = store.get('users');
  for (x in users) {
    if (users[x].id == req.params.user) {
      users.splice(x,1);
    }
  }

  store.set('users', users);
  res.sendStatus(200);
});

module.exports = router;
