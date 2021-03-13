const dbValidators = require('./db-validator');
const generateJWT = require('./generate-jwt');

module.exports = {
  ...dbValidators,
  ...generateJWT
}