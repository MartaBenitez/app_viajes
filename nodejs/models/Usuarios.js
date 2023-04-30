const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    idUsuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    fechaAlta: {
        type: Date,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    viajes: {
        type: Array,
    }
});

mongoose.model('Usuarios', UsuariosSchema,'usuarios');
