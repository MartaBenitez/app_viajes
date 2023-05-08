const mongoose = require('mongoose');
require('../models/Evento');
const dias = mongoose.model('Dias');
const eventos = mongoose.model('Eventos');

function recuperarTodos(req, res) { 
    const id=req.params.id;
    dias.findOne({ '_id': id})
        .then(diaLeido => {
            let miseventos = diaLeido.eventos;
            if(!miseventos||miseventos.length==0){
                return res.send([]);
            }else{
                let listaEventos=[];
                miseventos.forEach(evento =>{
                    eventos.findOne({ '_id': evento})
                    .then(eventoLeido => {
                       listaEventos.push(eventoLeido);
                       return res.send(listaEventos);
                    })
                    .catch(error => {
                        return res.status(400).send({
                            status: 'error' + error
                        });
                    });
                });
            }
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
}
function recuperarUno(req, res) { 
    const id=req.params.id;
    eventos.findOne({ '_id': id})
        .then(eventoLeido => {
            return res.send(eventoLeido ? eventoLeido : {});
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
}

function addNuevo(req, res) { 
    const evento = req.body;
    if (evento._id == 0) {
        delete viaje._id;
    }
    new eventos(evento).save()
        .then(eventoAnadido=> {
            dias.updateOne({'_id':eventoAnadido.idDia},{$push:{'eventos':eventoAnadido._id}})
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
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
}

function modificar(req, res) {
    let evento = req.body;
    const id=req.params.id;
    eventos.updateOne({ '_id': id },evento)
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

function eliminar(req, res) { 
    eventos.findOne({ '_id': req.params.id})
    .then(eventoLeido => {
        dias.updateOne({'_id':eventoLeido.idDia},{$pull:{'eventos':eventoLeido._id}})
        .then(() => {
            eventos.deleteOne({ '_id': req.params.id})
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
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });

    })
    .catch(error => {
        return res.status(400).send({
            status: 'error' + error
        });
    });
}



module.exports = { eliminar, modificar, addNuevo, recuperarTodos, recuperarUno };

