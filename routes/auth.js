const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validfields } = require('../middlewares');

const router = Router();

router.post('/login', [
  check('email', 'El correo electrónico es requerido').isEmail(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
  validfields
], login);


module.exports = router;