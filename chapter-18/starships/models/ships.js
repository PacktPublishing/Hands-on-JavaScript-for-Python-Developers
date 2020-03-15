require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

const loadDB = async () => {
  if (database) {
    return database;
  }

  try {
    await client.connect();
    database = client.db("starships");
  } catch (err) {
    console.error(err);
  }

  return database;
}

loadDB();

const eliminateExistingShips = async () => {
  const fleet = await database.collection("fleet").find().toArray();

  const fleetNames = [];

  fleet.forEach(ship => {
    fleetNames.push(ship.name)
  })

  const names = await database.collection("names").find().toArray();

  const availableNames = names[0].names.filter((name) => {
    return fleetNames.indexOf(name)
  })

  const unavailableRegistryNumbers = Object.values(fleet).map((value, index, arr) => {
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
  const fleet = await database.collection("fleet").find().toArray();

  return fleet.sort((a, b) => (a.name > b.name) ? 1 : -1)
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

  database.collection("fleet").insertOne(shipData, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
  })

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