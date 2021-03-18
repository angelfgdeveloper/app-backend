const validFields = require('./valid-fields');
const validJWT = require('./valid-jwt');

module.exports = {
  ...validFields,
  ...validJWT
}