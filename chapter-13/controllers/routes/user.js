var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/users');

/* GET all users. */
router.get('/', async (req, res, next) => {
  res.send(await UsersController.getUsers());
});

/* GET user. */
router.get('/:user', async (req, res, next) => {
  const user = await UsersController.getUser(req.params.user);
  res.render('user', { user: user });
});

/* POST to create user. */
router.post('/', async (req, res, next) => {
  await UsersController.createUser();
  res.send(await UsersController.getUsers());
});

/* DELETE user. */
router.delete('/:user', async (req, res, next) => {
  await UsersController.deleteUser(req.params.user);
  res.sendStatus(200);
});

module.exports = router;
