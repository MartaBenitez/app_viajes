const mongoose = require('mongoose');
require('../models/Viaje');
require('../models/Dia');
require('../models/Evento');
const viajes = mongoose.model('Viajes');
const usuarios = mongoose.model('Usuarios');
const dias = mongoose.model('Dias');
const eventos = mongoose.model('Eventos');


async function recuperarMios(req, res) {
  try {
    const id = req.params.id;
    const usuarioLeido = await usuarios.findOne({ _id: id });
    let misviajes = usuarioLeido.viajes;

    if (!misviajes || misviajes.length == 0) {
      return res.send([]);
    } else {
      let listaPromesas = [];

      misviajes.forEach((viaje) => {
        let promesaViaje = viajes.findOne({ _id: viaje });
        listaPromesas.push(promesaViaje);
      });

      const viajesLeidos = await Promise.all(listaPromesas);
      return res.send(viajesLeidos);
    }
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function recuperarUno(req, res) {
  try {
    const id = req.params.id;
    const usuarioLeido = await viajes.findOne({ '_id': id });
    return res.send(usuarioLeido ? usuarioLeido : {});
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function addNuevo(req, res) {
  try {
    const viaje = req.body;
    if (viaje._id == 0) {
      delete viaje._id;
    }

    const nuevoViaje = new viajes(viaje);
    const viajeGuardado = await nuevoViaje.save();

    await usuarios.updateOne({ '_id': viaje.idUsuario }, { $push: { 'viajes': viajeGuardado._id } });

    const resultado = await anadirDias(viajeGuardado);
    if (resultado == "correcto") {
      return res.send({
        status: 'correcto'
      });
    } else {
      return res.status(400).send({
        status: 'error' + resultado
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function modificar(req, res) {
  try {
    let viaje = req.body;
    const id = req.params.id;

    const viajeLeido = await viajes.findOne({ _id: id });
    const resultado = await modificarDias(viaje, viajeLeido);

    if (resultado === "correcto") {
      await viajes.updateOne({ _id: viajeLeido._id }, viaje);
      return res.send({
        status: 'correcto'
      });
    } else {
      return res.status(400).send({
        status: 'error' + resultado
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function modificarDias(nuevoViaje, viajeLeido) {
  try {
    const numDias = nuevoViaje.numDias;
    let fechaInicio = new Date(nuevoViaje.fechaInicio);
    let listaDias = [];

    await dias.deleteMany({ "idViaje": viajeLeido._id });

    const createPromises = [];
    for (let i = 0; i < numDias; i++) {
      const createPromise = dias.create({ 'idViaje': viajeLeido._id, 'fecha': new Date(fechaInicio) });
      createPromises.push(createPromise);
      fechaInicio.setDate(fechaInicio.getDate() + 1);
    }

    const diasInsertados = await Promise.all(createPromises);
    listaDias = diasInsertados.map((dia) => dia._id);
    nuevoViaje.dias = listaDias;

    await viajes.updateOne({ "_id": viajeLeido._id }, { $set: { 'dias': listaDias } });

    return "correcto";
  } catch (error) {
    return error;
  }
}


async function eliminar(req, res) {
  try {
    const id=req.params.id;
    const viajeLeido = await viajes.findOne({ '_id': id});

    await usuarios.updateOne({ '_id': viajeLeido.idUsuario }, { $pull: { 'viajes': viajeLeido._id } });

    await eventos.deleteMany({ 'idViaje': id });

    await dias.deleteMany({ 'idViaje':id });
    await viajes.deleteOne({ '_id': id });

    return res.send({
      status: 'correcto'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}


async function anadirDias(viaje) {
  try {
    const numDias = viaje.numDias;
    let fechaInicio = new Date(viaje.fechaInicio);
    for (let i = 0; i < numDias; i++) {
      const diaInsertado = await dias.create({ idViaje: viaje._id, fecha: fechaInicio });
      await viajes.updateOne({ "_id": viaje._id }, { $push: { dias: diaInsertado._id } });
      fechaInicio.setDate(fechaInicio.getDate() + 1);
    }
    return "correcto";
  } catch (error) {
    return error;
  }
}

module.exports = { eliminar, modificar, addNuevo, recuperarMios, recuperarUno };
