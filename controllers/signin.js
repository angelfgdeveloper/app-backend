const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers');


const signinPost = async(req = request, res = response) => {

  const { name, birth, email, password, role } = req.body;
  
  try {
    const user = new User({ name, birth, email, password, role });
    
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
  
    // Guardar en BD
    await user.save();

    // Generar el JWT
    const token = await generateJWT( user.id );
  
    res.json({
      user,
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Problema en el servidor - Comunicate con el Administrador (SIGN_IN)'
    });
  }

}


module.exports = {
  signinPost
}