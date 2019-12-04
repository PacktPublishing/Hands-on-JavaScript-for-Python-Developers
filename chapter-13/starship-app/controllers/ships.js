const ShipsModel = require('../models/ships');

exports.createShip = async (data) => {
  return await ShipsModel.createShip(data);
}

exports.getFleet = async(data) => {
  return await ShipsModel.getFleet();
}

exports.createRandom = async () => {
  return await ShipsModel.createRandom();
}