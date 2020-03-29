const MongoDB = require('../models/mongo')
const insertRandomNames = require('../models/setup')

describe('insert', () => {
  let db;

  beforeAll(async () => {
    db = await MongoDB.connectDB()
  });

  afterAll(async (done) => {
    await MongoDB.disconnectDB();
    done()
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });

    expect(insertedUser).toEqual(mockUser);
  });

  it('should insert the random names', async () => {
    const res = await insertRandomNames()
    
    db = await MongoDB.connectDB()

    const names = await db.collection("names").find().toArray()
    console.log(names)
    expect(names.length).toBeGreaterThan(0)
  });

  // it('should retrieve the first name', async() => {
  //   const insertedShip = await db.findOne({ key:  });
  //   expect(insertedUser).toEqual(mockUser);
  // }
  // });
});