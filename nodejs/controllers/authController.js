const mongoose = require('mongoose');
require('../models/Usuario');
const usuarios = mongoose.model('Usuarios');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config');

const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const email = req.body.email;
    const contrasena = req.body.contrasena;

    const usuario = await usuarios.findOne({ email: email });
    if (!usuario || usuario.estado == 'inactivo') {
      return res.status(404).send({ message: 'El usuario no existe' });
    }

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (match) {
      const payload = {
        _id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      };

      jwt.sign(payload, CONFIG.SECRET_TOKEN, function (error, token) {
        if (error) {
          res.status(500).send({ error });
        } else {
          res.status(200).send({ message: 'Acceso', token });
        }
      });
    } else {
      res.status(403).send({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
}

async function registro(req, res) {
  try {
    const usuario = req.body;
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

module.exports = { registro, login };
