const mongoose = require('mongoose');
require('../models/Evento');
const dias = mongoose.model('Dias');
const eventos = mongoose.model('Eventos');

async function recuperarTodos(req, res) { 
  try {
    const id = req.params.id;
    const listaEventos = await eventos.find({ 'idViaje': id });
    if (!listaEventos || listaEventos.length == 0) {
      return res.send([]);
    } else {
      return res.send(listaEventos);
    }
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}


async function addNuevo(req, res) { 
  try {
    const evento = req.body;
    if (evento._id == 0) {
      delete evento._id;
    }
    const eventoAnadido = await new eventos(evento).save();
    await dias.updateOne({ '_id': eventoAnadido.idDia }, { $push: { 'eventos': eventoAnadido._id } });
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
  try {
    const evento = req.body;
    const id = req.params.id;
    await eventos.updateOne({ '_id': id }, evento);
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
  try {
    const eventoLeido = await eventos.findOne({ '_id': req.params.id });
    await dias.updateOne({ '_id': eventoLeido.idDia }, { $pull: { 'eventos': eventoLeido._id } });
    await eventos.deleteOne({ '_id': req.params.id });
    return res.send({
      status: 'correcto'
    });
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

module.exports = { eliminar, modificar, addNuevo, recuperarTodos };
