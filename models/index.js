const Server = require('./server');
const User = require('./user');
const Role = require('./role');

module.exports = {
  ...Server,
  User,
  Role
}