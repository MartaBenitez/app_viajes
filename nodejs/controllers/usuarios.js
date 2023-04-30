require('../models/Usuarios');

const mongoose = require('mongoose');
const usuarios = mongoose.model('Usuarios');

async function recuperarTodos(req, res) {
    try {
        const usuariosLeidas = await usuarios.find({});
        return res.send(usuariosLeidas && usuariosLeidas.length ? usuariosLeidas : []);
    } catch (error) {
        return res.status(400).send({
            status: 'failure'
        });
    }
}
async function recuperarSeleccionados(req, res) {
    try {
        const condiciones = req.body; //DEBERÍA VALIDARSE
        const usuariosLeidas = await usuarios.find(condiciones);
        return res.send(usuariosLeidas && usuariosLeidas.length ? usuariosLeidas : []);
    } catch (error) {
        return res.status(400).send({
            status: 'failure'
        });
    }
}
async function recuperarUno(req, res) {
    try {
        const usuarioLeida = await usuarios.findOne({ '_id': req.params.id });

        return res.send(usuarioLeida ? usuarioLeida : {});
    } catch (error) {
        return res.status(400).send({
            status: 'failure'
        });
    }
}
async function validarUsuario(req, res) {
    try {
        const usuario = req.body; // DEBERIA VALIDARSE
        const usuarioLeido = 
             await usuarios.findOne({ 'codigoUsuario': usuario.codigoUsuario, 'clave':usuario.clave });
        if (usuarioLeido){
            return res.send({status: 'success'});
        } else {
            return res.send({status: 'not found'});
        }
    } catch (error) {
        return res.status(400).send({
            status: 'failure'
        });
    }
}
async function addNuevo(req, res) {
    try {
        const usuario = req.body; // DEBERIA VALIDARSE
        if (usuario._id == 0) {
            delete usuario._id;
        }
        await new usuarios(usuario).save();
        return res.send({
            status: 'success'
        });
    } catch (error) {
        return res.status(400).send({
            status: 'failure' + error
        });
    }
}

async function modificar(req, res) {
    try {
        const usuario = req.body; //DEBERIA VALIDARSE
        await usuarios.updateOne({ '_id': usuario._id }, usuario);
        return res.send({
            status: 'success'
        });
    } catch (error) {
        return res.status(400).send({
            status: 'failure'
        });
    }
}

async function eliminar(req, res) {
    try {
        await usuarios.deleteOne({ '_id': req.params.id });
        return res.send({
            status: 'success'
        });
    } catch (error) {
        return res.status(400).send({
            status: 'failure'
        });
    }
}

module.exports = { eliminar, modificar, validarUsuario, addNuevo, recuperarTodos, recuperarSeleccionados, recuperarUno };
