var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users.js');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let users = await UsersController.getUsers();
  res.render('index', { users: users });
});

router.post('/', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
