const UsersModel = require('../models/users');

exports.createUser = async () => {
  return await UsersModel.createUser();
};

exports.deleteUser = async (userID) => {
  await UsersModel.deleteUser(userID);
}

exports.getUser = async (userID) => {
  const user = await UsersModel.getUser(userID);
  return user;
}

exports.getUsers = async () => {
  return new Promise((resolve, reject) => {
    resolve(UsersModel.getUsers());
  })
}