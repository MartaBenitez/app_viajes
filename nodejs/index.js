const mongoose = require('mongoose'); 
const express = require('express');
const cors = require('cors');

const database = require('./config/database');
const CONFIG = require('./config/config');
const authToken = require('./middlewares/authToken');

const routerUsuarios = require('./routes/usuarios');
const routerAuth = require('./routes/auth');
const routerViajes = require('./routes/viajes');
const routerDias = require('./routes/dias');
const routerEventos = require('./routes/eventos');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use('/public', express.static(__dirname + '/public'));

database.connect();

const db = mongoose.connection;

db.on('error', () => { 
    setTimeout(() => {
        console.log('Fallo en la conexión a la BBD. Se reintenta.');
        connectWithRetry();
    },5000);
});

db.on('connected', () => { 
    const corsOptions = {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      };
      
    app.use(cors(corsOptions));
    app.use(authToken);

    app.use('/',routerAuth); 
    app.use('/usuarios',routerUsuarios);
    app.use('/viajes',routerViajes);
    app.use('/dias',routerDias);
    app.use('/eventos',routerEventos);

    
    app.use(function(req, res, next) {
        res.status(404).send('Página no encontrada');
    });

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Error del servidor');
    })
    
    app.listen(CONFIG.PORT, () => console.log(`Todo OK. Servidor escuchando en ${CONFIG.PORT}!`));
});

