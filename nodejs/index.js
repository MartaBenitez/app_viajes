const mongoose = require('mongoose'); 
const express = require('express');
const cors = require('cors'); //módulo para permitir CORS

const database = require('./config/database');
const CONFIG = require('./config/config');
const authToken = require('./middlewares/authToken');

const routerUsuarios = require('./routes/usuarios');
const routerAuth = require('./routes/auth');
const routerViajes = require('./routes/viajes');
const routerDias = require('./routes/dias');
const routerEventos = require('./routes/eventos');

const app = express(); // crea una aplicación de tipo express

app.use(cors()); // NO OLVIDAR QUITAR EN PRODUCCION SINO SE DESEA CORS
app.use(express.json()); // El campo body del response y del request se va a tratar como un json
app.use(express.urlencoded({ extended: false })); // no se permite el urlencoded extendido
app.use('/public', express.static(__dirname + '/public')); // directorio donde se pueden dejar archivos y fotos públicas

database.connect();

const db = mongoose.connection;

db.on('error', () => { // si hay un fallo de la conexión se vuelve a intentar pasado un tiempo
    setTimeout(() => {
        console.log('Fallo en la conexión a la BBD. Se reintenta.');
        connectWithRetry();
    },5000);
});

db.on('connected', () => { // si hay conexión

    app.use(authToken);

    app.use('/auth',routerAuth); 
    app.use('/usuarios',routerUsuarios);
    app.use('/viajes',routerViajes);
    app.use('/dias',routerDias);
    app.use('/eventos',routerEventos);

    
    // Si se pide una ruta invalida se devuelve un 404
    app.use(function(req, res, next) {
        res.status(404).send('Página no encontrada');
    });

    // En caso de cualquier otro problema se devuelve un 500 - error en el servidor
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Error del servidor');
    })
    
    app.listen(CONFIG.PORT, () => console.log(`Todo OK. Servidor escuchando en ${CONFIG.PORT}!`)); // se lanza la API en el puerto correspondiente
});



//const methodOverride = require('method-override');
//let createError = require('http-errors'); // módulo para gestionar los errores http
//let logger = require('morgan'); // módulo que permite emitir logs con formato
//app.use(methodOverride('_method')); // PO DEFECTO LAS PETICIONES HTTP SOLO PUEDEN SET GET o POST, PERO SE PUEDE RECIBIR TB PUT y DELETE
//app.use(logger('dev')); // NO OLVIDAR CAMBIAR EN PRODUCCION a PROD