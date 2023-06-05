const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        minLength: 1,
        maxLength: 250
    },
    idDia: {
        type: Schema.ObjectId,
        required:true
    },
    idViaje: {
        type: Schema.ObjectId,
        required:true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        maxLength: 1500
    },
    enlace:{
        type: String
    },
    ubicacion: {
        type: String
    },
    longitud: {
        type: Number
    },
    latitud: {
        type: Number
    },
    precio: {
        type: Number,
        min: 0
    }
});

mongoose.model('Eventos', EventoSchema,'eventos');