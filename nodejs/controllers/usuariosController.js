const mongoose = require('mongoose');
require('../models/Usuario');
const usuarios = mongoose.model('Usuarios');

function recuperarTodos(req, res) {
    usuarios.find({})
        .then(usuariosLeidos => {
            return res.send(usuariosLeidos && usuariosLeidos.length ? usuariosLeidos : []);
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
}

function recuperarUno(req, res) {
    const id=req.params.id;
    usuarios.findOne({ '_id': id})
        .then(usuarioLeido => {
            return res.send(usuarioLeido ? usuarioLeido : {});
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
}


function addNuevo(req, res) {
    const usuario = req.body; // DEBERIA VALIDARSE
    if (usuario._id == 0) {
        delete usuario._id;
    }
    new usuarios(usuario).save()
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

function modificar(req, res) {
    let usuario = req.body; //DEBERIA VALIDARSE
    const id=req.params.id;
    usuarios.findOneAndUpdate({ '_id': id }, usuario)
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
    usuarios.updateOne({ '_id': req.params.id},{'estado':'inactivo','fechaBaja':new Date()})
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

// function recuperarSeleccionados(req, res) {
//     const condiciones = req.body; //DEBERÍA VALIDARSE
//     usuarios.find(condiciones)
//         .then(usuariosLeidos => {
//             return res.send(usuariosLeidos && usuariosLeidos.length ? usuariosLeidos : []);
//         })
//         .catch(error => {
//             return res.status(400).send({
//                 status: 'error'
//             });
//         });
// }

module.exports = { eliminar, modificar, addNuevo, recuperarTodos, /*recuperarSeleccionados,*/ recuperarUno };


