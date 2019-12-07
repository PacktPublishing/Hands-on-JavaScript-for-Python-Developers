
const storage = require('node-persist');

storage.init();

exports.createShip = async (data) => {
  data.shields = 100;
  data.hull = 0;
  await storage.setItem(data.registry, data);
  return;
}

exports.getFleet = async () => {
  const ships = await storage.values();
  return ships.sort((a, b) => (a.name > b.name) ? 1 : -1);
}

exports.createRandom = async () => {
  const shipNames = require('../data/starship-names');
  const randomSeed = Math.ceil(Math.random() * shipNames.names.length);

  const shipData = {
    name: shipNames.names[randomSeed],
    registry: `NCC-${Math.round(Math.random()*10000)}`,
    shields: 100,
    torpedoes: Math.round(Math.random()*255+1),
    hull: 0,
    speed: (Math.random()*9+1).toPrecision(2),
    phasers: Math.round(Math.random()*100+1),
    x: 0,
    y: 0,
    z: 0
  };

  if (storage.getItem(shipData.registry) || storage.values('name') == shipData.name) {
    shipData.registry = `NCC-${Math.round(Math.random()*10000)}`;
    shipData.name = shipNames.names[Math.round(Math.random()*shipNames.names.length)];
  }
  
  await storage.setItem(shipData.registry, shipData);
  return;
}

exports.scuttle = async (ship) => {
  await storage.removeItem(ship);
  return;
}

exports.getShip = async (ship) => {
  return await storage.getItem(ship);
}