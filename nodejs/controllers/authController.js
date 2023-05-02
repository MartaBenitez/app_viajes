const mongoose = require('mongoose');
require('../models/Usuario');
const usuarios = mongoose.model('Usuarios');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config');

const jwt = require('jsonwebtoken');

function login(req,res){
    let email = req.body.email;
    let contrasena= req.body.contrasena;

    usuarios.findOne({email:email})
        .then(usuario => {
            if(!usuario || usuario.estado=='inactivo') return res.status(404).send({message: 'El usuario no existe'});
            bcrypt.compare(contrasena,usuario.contrasena)
                  .then(match => {
                        if(match){
                            payload = {
                                _id: usuario._id,
                                email: usuario.email,
                                nombre: usuario.nombre,
                                rol: usuario.rol
                            }
                            jwt.sign(payload,CONFIG.SECRET_TOKEN,function(error,token){
                                if(error){
                                    res.status(500).send({error});
                                }else{
                                    res.status(200).send({message: 'Acceso',token});
                                }
                            })
                        }else{
                            res.status(200).send({message: 'Contraseña incorrecta'});
                        }
                  }).catch(error => {
                    console.log(error);
                    res.status(500).send({error});
                  });
        }).catch(error => {
            console.log(error);
            res.status(500).send({error});
        });
}

function registro(req,res){
    const usuario = req.body; // DEBERIA VALIDARSE
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


module.exports = {registro, login};