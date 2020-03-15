var express = require('express');
var router = express.Router();
const ShipsController = require('../controllers/ships');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { ships: await ShipsController.getFleet() });
});

module.exports = router;
