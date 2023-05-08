const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiaSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    idViaje: {
        type: Schema.ObjectId,
        required:true
    },
    fecha: {
        type: Date,
        required: true,
        min: new Date()
    },
    descripcion: {
        type: String,
        minLength: 1,
        maxLength: 1500
    },
    lugares: {
        type: Array
    },
    presupuesto: {
        type: Number,
        min: 0
    },
    eventos: {
        type: Array
    }
});

mongoose.model('Dias', DiaSchema,'dias');