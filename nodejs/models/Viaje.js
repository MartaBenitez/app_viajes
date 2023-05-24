const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViajeSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    idUsuario: {
        type: Schema.ObjectId,
        required: true
    },
    origen: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    destino: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    fechaInicio: {
        type: Date,
        required: true,
        min: new Date()
    },
    numDias: {
        type: Number,
        required: true,
        min: 1
    },
    numPersonas: {
        type: Number,
        min: 1
    },
    presupuesto: {
        type: Number,
        min: 0
    },
    dias: {
        type: Array
    }
});

mongoose.model('Viajes', ViajeSchema,'viajes');
