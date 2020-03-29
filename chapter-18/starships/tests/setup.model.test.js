const MongoDB = require('../models/mongo')
const insertRandomNames = require('../models/setup')

describe('insert', () => {
  let db;

  beforeAll(async () => {
    db = await MongoDB.connectDB('test')
  });

  afterAll(async (done) => {
    await db.collection('names').deleteMany({})
    await MongoDB.disconnectDB()
    done()
  });

  beforeEach(async () => {
    
  });

  it('should insert the random names', async () => {
    await insertRandomNames()

    const names = await db.collection("names").find().toArray()
    expect(names.length).toBeGreaterThan(0)
  });

});