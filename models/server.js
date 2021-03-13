const express = require('express');
const cors = require('cors');

const { databaseConnect } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      signin: '/api/signin',
      auth: '/api/auth',
    }

    // Conectar a base de datos
    this.connectDB();
    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  async connectDB() {
    await databaseConnect();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.signin, require('../routes/signin'));
    this.app.use(this.paths.auth, require('../routes/auth'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor conectado en puerto', this.port);
    });
  }

}


module.exports = {
  Server
}

/**
 * -- init project default --
 * npm init -y
 * -- install --
 * npm install express
 * npm i dotenv
 * npm i cors
 * npm i express-validator
 * npm i bcryptjs
 * npm i mongoose
 * npm i jsonwebtoken
 */