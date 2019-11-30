const storage = require('node-persist');
var https = require('https');

storage.init();

exports.createUser = () => {
  return new Promise( (resolve,reject) => {
    https.get('https://randomuser.me/api/', (response) => {
      response.setEncoding('utf8');
      let rawData = '';
      response.on('data', (chunk) => { rawData += chunk; });
      response.on('end', async () => {
      
        try {
          const parsedData = JSON.parse(rawData).results[0];
          const user = {
              username: parsedData.login.username,
              name: `${parsedData.name.first} ${parsedData.name.last}`,
              email: parsedData.email,
              id: parsedData.login.uuid,
              avatar: parsedData.picture.thumbnail
          }
          storage.setItem(user.id, user);
          resolve(user);
        } catch (e) {
          console.error(e);
        }
      })
    });
  });
};

exports.deleteUser = async (userID) => {
  return await storage.removeItem(userID);
}

exports.getUser = async (userID) => {
  return await storage.getItem(userID);
}

exports.getUsers = async () => {
  return new Promise((resolve, reject) => {
    resolve(storage.values());
  })
}