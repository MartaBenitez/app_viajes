const mongoose = require('mongoose');
require('../models/Usuario');
require('../models/Dia');
require('../models/Evento');
require('../models/Viaje');
const usuarios = mongoose.model('Usuarios');
const dias = mongoose.model('Dias');
const eventos = mongoose.model('Eventos');
const viajes = mongoose.model('Viajes');

async function recuperarTodos(req, res) {
  try {
    const usuariosLeidos = await usuarios.find({});
    return res.send(usuariosLeidos && usuariosLeidos.length > 0 ? usuariosLeidos : []);
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function recuperarUno(req, res) {
  try {
    const id = req.params.id;
    const usuarioLeido = await usuarios.findOne({ '_id': id });
    return res.send(usuarioLeido ? usuarioLeido : {});
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function addNuevo(req, res) {
  const usuario = req.body;
  if (usuario._id == 0) {
    delete usuario._id;
  }
  try {
    await new usuarios(usuario).save();
    return res.send({
      status: 'correcto'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function modificar(req, res) {
  const usuario = req.body;
  const nombre =usuario.nombre;
  const apellidos = usuario.apellidos;
  const email = usuario.email;
  const id = req.params.id;
  try {
    await usuarios.updateOne({ '_id': id },{'nombre':nombre, 'apellidos':apellidos,'email':email});
    return res.send({
      status: 'correcto'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function modificarContrasena(req, res) {
  const { contrasena } = req.body;
  const id = req.params.id;
  try {
    await usuarios.findOneAndUpdate({ '_id': id }, { 'contrasena': contrasena });
    return res.send({
      status: 'correcto'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function eliminar(req, res) {
  const id = req.params.id;
  try {
    const usuario = await usuarios.findById(id);
    const viajesIds = usuario.viajes;
    await Promise.all(
      viajesIds.map(async (viajeId) => {
        await eventos.deleteMany({'idViaje': viajeId });
        await dias.deleteMany(({'idViaje':viajeId}))
        await viajes.deleteOne({'_id':viajeId})
      })
    );
    await usuarios.updateOne({ '_id': req.params.id},{'estado':'inactivo','fechaBaja':new Date(),'email':'defecto@defecto.com'})
    return res.send({
      status: 'correcto'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function suspender(req, res) {
  const id = req.params.id;
  try {
    const usuario = await usuarios.findById(id);
    const viajesIds = usuario.viajes;
    await Promise.all(
      viajesIds.map(async (viajeId) => {
        await eventos.deleteMany({'idViaje': viajeId });
        await dias.deleteMany(({'idViaje':viajeId}))
        await viajes.deleteOne({'_id':viajeId})
      })
    );
    await usuarios.updateOne({ '_id': req.params.id},{'estado':'inactivo','fechaBaja':new Date()})
    return res.send({
      status: 'correcto'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}


module.exports = { eliminar, modificar, modificarContrasena, suspender, addNuevo, recuperarTodos, recuperarUno };
