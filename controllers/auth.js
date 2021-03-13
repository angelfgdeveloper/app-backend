const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers');


const login = async(req = request, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar si el correo existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'El correo y/o contraseña es inválido'
      });
    }

    // Si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        message: 'El correo y/o contraseña es inválido'
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync( password, user.password );
    if (!validPassword) {
      return res.status(400).json({
        message: 'El correo y/o contraseña es inválido'
      });
    }

    // Generar el JWT
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Problema en el servidor - Comunicate con el Administrador (LOGIN)'
    });
  }

}


module.exports = {
  login
}