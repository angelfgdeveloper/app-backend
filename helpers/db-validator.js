const { User, Role } = require("../models");

const emailExist = async( email = '' ) => {
  // Verificar si el correo existe
  // const existEmail = await User.findOne({ email });
  const existEmail = await User.findOne({ email });
  if ( existEmail ) {
    throw new Error(`El email: ${ email }, ya está registrado`);
  }
}

const isRoleValid = async(role = '') => {
  const existRole = await Role.findOne({ role });
  if ( !existRole ) {
      throw new Error(`El rol ${ role } no está registrado en la BD`);
  }
}


module.exports = {
  emailExist,
  isRoleValid
}