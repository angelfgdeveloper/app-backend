const { Router } = require('express');
const { check } = require('express-validator');

const { login, refreshToken } = require('../controllers/auth');
const { validfields, validJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
  check('email', 'El correo electrónico es requerido').isEmail(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
  validfields
], login);

router.get('/', validJWT, refreshToken);


module.exports = router;