const mongoose = require('mongoose');

const connectWithRetry = () => {
  mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
      console.error('Error al conectar a la base de datos:', error.message);
      console.log('Reintentando conexión en 5 segundos...');
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = connectWithRetry;
