const MongoDB = require('../models/mongo')
const insertRandomNames = require('../models/setup')

const { getFleet, createRandom, scuttle, getShip, createShip } = require('../models/ships')

describe('fleet', () => {
  let db;

  beforeAll(async () => {
    db = await MongoDB.connectDB('test')
    await db.collection('fleet').deleteMany({})
    await insertRandomNames()
  });

  afterAll(async (done) => {
    await MongoDB.disconnectDB();
    done()
  });

  beforeEach(async () => {
    // await db.collection('test').deleteMany({});
  });

  it('should return an empty fleet', async() => {
    const fleet = await getFleet()

    expect(fleet.length).toEqual(0)
  })

  it('should insert one ship', async() => {
    await createRandom();
    const fleet = await getFleet()

    expect(fleet.length).toEqual(1)
  })

  it('should insert, find, and scuttle one ship', async() => {
    const random = await createRandom();
    let fleet = await getFleet()

    expect(fleet.length).toEqual(2)

    const ship = await getShip(random)

    expect(ship.registry).toEqual(random)

    await scuttle(random)
    
    fleet = await getFleet()

    expect(fleet.length).toEqual(1)
  })

  it('should create and find one ship', async() => {
    const data = {
      name: "Seleya",
      speed: 9.5,
      phasers: 100,
      torpedos: 10
    }

    const myShip = await createShip(data)
    const returnedShip = await getShip(myShip)

    expect(returnedShip.name).toEqual("Seleya")
  })
});