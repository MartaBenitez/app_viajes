const mongoose = require('mongoose');
require('../models/Dia');
const dias = mongoose.model('Dias');

function recuperarUno(req, res) { 
    const id=req.params.id;
    dias.findOne({ '_id': id})
        .then(diaLeido => {
            return res.send(diaLeido ? diaLeido : {});
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
}

function recuperarDias(req, res) {
    const idViaje=req.params.id;
    dias.find({'idViaje': idViaje})
        .then(diasLeidos => {
            return res.send(diasLeidos && diasLeidos.length ? diasLeidos : []);
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });

}

function modificar(req, res) {
    let dia = req.body;
    const id=req.params.id;
    dias.updateOne({ '_id': id }, {'descripcion':dia.descripcion,'presupuesto':dia.presupuesto,'lugares':dia.lugares})
        .then(() => {
            return res.send({
                status: 'correcto'
            });
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
   
}



module.exports = {modificar, recuperarUno, recuperarDias};


