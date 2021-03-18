const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validJWT = async(req = request, res = response, next) => {

  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      message: 'No hay token en la petición'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_JWT);

    // Leer el usuario que corresponde al uid
    const user = await User.findById(uid);

    // User no existe en DB
    if ( !user ) {
      return res.status(401).json({
        message: 'Token no válido'
      });
    }

    // Verificar si el uid tiene status - true
    if ( !user.status ) {
      return res.status(401).json({
        message: 'Token no válido'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Token no válido'
    });
  }

}

module.exports = {
  validJWT
}