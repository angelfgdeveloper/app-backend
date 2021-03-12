const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  birth: {
    type: String,
    required: [true, 'La fecha de nacimiento es requerida']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'El contraseña es obligatoria']
  },
  image: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },

});

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject(); 
  user.uid = _id;
  return user;
}

module.exports = model('User', UserSchema);