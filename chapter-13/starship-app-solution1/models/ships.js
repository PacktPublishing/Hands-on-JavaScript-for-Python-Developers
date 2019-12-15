
const storage = require('node-persist');

storage.init();

const eliminateExistingShips = async () => {
  const shipNames = require('../data/starship-names');
  const ships = await storage.values();

  const names = Object.values(ships).map((value, index, arr) => {
    return value.name;
  });

  const availableNames = shipNames.names.filter((val) => {
    return !names.includes(val);
  });

  const unavailableRegistryNumbers = Object.values(ships).map((value, index, arr) => {
    return value.registry;
  });

  return { names: availableNames, unavailableRegistries: unavailableRegistryNumbers };
}


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
  const { names, unavailableRegistries } = await eliminateExistingShips();

  const randomSeed = Math.ceil(Math.random() * names.length);

  const shipData = {
    name: names[randomSeed],
    registry: `NCC-${Math.round(Math.random() * 10000)}`,
    shields: 100,
    torpedoes: Math.round(Math.random() * 255 + 1),
    hull: 0,
    speed: (Math.random() * 9 + 1).toPrecision(2),
    phasers: Math.round(Math.random() * 100 + 1),
    x: 0,
    y: 0,
    z: 0
  };

  while (unavailableRegistries.includes(shipData.registry)) {
    shipData.registry = `NCC-${Math.round(Math.random() * 10000)}`;
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

exports.fireTorpedo = async (ship) => {
  const source = await storage.getItem(ship);
  return await storage.setItem(source.torpedoes, source.torpedoes--);
}

exports.registerDamage = async (ship, damage) => {
  const target = await storage.getItem(ship);
  if (target.shields) {
    target.shields -= damage;
    if (target.shields < 0) {
      target.hull -= Math.abs(target.shields);
      target.shields = 0;
    }
  }

  await storage.setItem(ship, target);
  if (target.hull <= 0) {
    this.scuttle(ship);
    return 0;
  }

  return { shields: target.shields, hull: target.hull };
}