const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuarioSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    contrasena: {
        type: String,
        required: true,
        match: /^[a-z0-9*?#@$]+$/i,
        minLength: 8,
        maxLength: 25

    },
    nombre: {
        type: String,
        required: true,
        match: /^[a-zA-Z\u00C0-\u017F\s-]+$/,
        minLength: 3,
        maxLength: 25
    },
    apellidos: {
        type: String,
        required: true,
        match:  /^[a-zA-Z\u00C0-\u017F\s-]+$/,
        minLength: 3,
        maxLength: 50
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        max: `${(new Date().getFullYear())-14}-${String((new Date().getMonth())+1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
        min: '1900-01-01'
    },
    fechaAlta: {
        type: Date,
        default: Date.now()
    },
    rol:{
        type: String,
        default:'user',
        enum:['user','admin'],
    },
    estado: {
        type: String,
        default: 'activo',
        enum:['activo','inactivo'],
    },
    fechaBaja: {
        type: Date
    },
    viajes: {
        type: Array
    }
});

UsuarioSchema.pre('save',function(next){
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.contrasena,salts).then(hash => {
            this.contrasena = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

UsuarioSchema.pre('findOneAndUpdate', function(next) {
    const usuario = this.getUpdate();
    bcrypt.hash(usuario.contrasena, 10, (err, hash) => {
        this.getUpdate().contrasena = hash;
        next();
    })
});

mongoose.model('Usuarios', UsuarioSchema,'usuarios');
