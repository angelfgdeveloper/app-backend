const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const signinPost = async(req = request, res = response) => {

  const { name, birth, email, password, role } = req.body;
  
  const user = new User({ name, birth, email, password, role });
  
  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  // Guardar en BD
  await user.save();

  res.json({
    user
  });

}

module.exports = {
  signinPost
}