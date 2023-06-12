const mongoose = require('mongoose');
require('../models/Dia');
const dias = mongoose.model('Dias');

async function recuperarUno(req, res) {
  try {
    const id = req.params.id;
    const diaLeido = await dias.findOne({ '_id': id });
    return res.send(diaLeido ? diaLeido : {});
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

async function recuperarDias(req, res) {
  try {
    const idViaje = req.params.id;
    const diasLeidos = await dias.find({ 'idViaje': idViaje });
    return res.send(diasLeidos && diasLeidos.length ? diasLeidos : []);
  } catch (error) {
    return res.status(400).send({
      status: 'error' + error
    });
  }
}

module.exports = { recuperarUno, recuperarDias };



