const { MongoClient, ServerApiVersion } = require('mongodb');
var createError = require('http-errors'); // módulo para gestionar los errores http
var express = require('express'); // framework que crea una aplicación web
var logger = require('morgan'); // módulo que permite emitir logs con formato
var cors = require('cors'); //módulo para permitir CORS
const mongoose = require('mongoose'); // ODM:  clase => BBDD NoSql Documental
//const jwt = require('jsonwebtoken') // módulo que permite crear y validar token de tipo jweb
//const methodOverride = require('method-override');

const routerUsuarios = require('./routes/usuarios');
const app = express(); // crea una aplicación de tipo express

//app.use(methodOverride('_method')); // PO DEFECTO LAS PETICIONES HTTP SOLO PUEDEN SET GET o POST, PERO SE PUEDE RECIBIR TB PUT y DELETE
app.use(logger('dev')); // NO OLVIDAR CAMBIAR EN PRODUCCION a PROD
app.use(cors()); // NO OLVIDAR QUITAR EN PRODUCCION SINO SE DESEA CORS

app.use(express.json()); // El campo body del response y del request se va a tratar como un json
app.use(express.urlencoded({ extended: false })); // no se permite el urlencoded extendido
app.use('/publica', express.static(__dirname + '/public')); // directorio donde se pueden dejar archivos y fotos públicas

const mongoUri = `mongodb+srv://MartaBenitez:Su5nyazMmaOONzAJ@cluster0.nqh8gct.mongodb.net/viajesdb?retryWrites=true&w=majority`; // url de la base de datos mongodb

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

let connectWithRetry = function() {
    return mongoose.connect(mongoUri);
}; // método que crea la conexión a la BBDD

connectWithRetry(); // se crea la conexión

db.on('error', () => { // si hay un fallo de la conexión se vuelve a intentar pasado un tiempo
    setTimeout(() => {
        console.log('Fallo en la conexión a la BBD. Se reintenta.');
        connectWithRetry();
    },5000);
});

db.on('connected', () => { // si hay conexión

    app.use('/usuarios',routerUsuarios); //se cargan las rutas


    // Si se pide una ruta invalida se devuelve un 404
    app.use(function(req, res, next) {
        res.status(404).send('Página no encontrada');
    });

    // En caso de cualquier otro problema se devuelve un 500 - error en el servidor
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Upss, algo no funciona');
    })

    app.listen(3000, () => console.log(`Todo OK. Servidor escuchando en 3000!`)); // se lanza la API en el puerto correspondiente
});
