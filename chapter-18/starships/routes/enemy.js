var express = require('express');
var router = express.Router();
const ShipsController = require('../controllers/ships');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('enemy', { fleet: await ShipsController.createFleet() });
});

module.exports = router;
