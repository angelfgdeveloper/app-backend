const mongoose = require('mongoose');


const databaseConnect = async() => {

  try {

    await mongoose.connect(process.env.MONGO_DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Base de datos en linea');
    
  } catch (err) {
    console.log(err);
    throw new Error('Error al inicializar la base de datos');
  }

}

module.exports = {
  databaseConnect
}