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
    eventos: {
        type: Array
    }
});

mongoose.model('Dias', DiaSchema,'dias');