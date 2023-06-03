const mongoose = require('mongoose');
require('../models/Viaje');
require('../models/Dia');
const viajes = mongoose.model('Viajes');
const usuarios = mongoose.model('Usuarios');
const dias = mongoose.model('Dias');

function recuperarTodos(req, res) { 
    viajes.find({})
        .then(viajesLeidos => {
            return res.send(viajesLeidos && viajesLeidos.length ? viajesLeidos : []);
        })
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
}

function recuperarMios(req, res) {
    const id = req.params.id;
  
    usuarios
      .findOne({ _id: id })
      .then((usuarioLeido) => {
        let misviajes = usuarioLeido.viajes;
  
        if (!misviajes || misviajes.length == 0) {
          return res.send([]);
        } else {
          let listaPromesas = [];
  
          misviajes.forEach((viaje) => {
            let promesaViaje = viajes.findOne({ _id: viaje });
            listaPromesas.push(promesaViaje);
          });
  
          Promise.all(listaPromesas)
            .then((viajesLeidos) => {
              return res.send(viajesLeidos);
            })
            .catch((error) => {
              return res.status(400).send({
                status: 'error' + error,
              });
            });
        }
      })
      .catch((error) => {
        return res.status(400).send({
          status: 'error' + error,
        });
      });
  }  


function recuperarUno(req, res) { 
    const id=req.params.id;
    viajes.findOne({ '_id': id})
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
    const viaje = req.body;
    if (viaje._id == 0) {
        delete viaje._id;
    }
    new viajes(viaje).save()
        .then(viaje => {
            usuarios.updateOne({'_id':viaje.idUsuario},{$push:{'viajes':viaje._id}})
            .then(() => {
                let resultado=anadirDias(viaje);
                if(resultado=="correcto"){
                    return res.send({
                        status: 'correcto'
                    });
                }else{
                    return res.status(400).send({
                        status: 'error' + resultado
                    });
                }
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
    let viaje = req.body;
    const id=req.params.id;
    viajes.findOne({ '_id': id })
        .then((viajeLeido) => {
            if(viaje.numDias!=viajeLeido.numDias || viaje.fechaInicio!=viajeLeido.fechaInicio){
                let resultado=modificarDias(viaje,viajeLeido);
                if(resultado=="correcto"){
                    viajes.updateOne({'_id':viajeLeido._id},viaje) .then(() => {
                        return res.send({
                            status: 'correcto'
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({
                            status: 'error' + error
                        });
                    })
                }else{
                    return res.status(400).send({
                        status: 'error' + resultado
                    })
                }
                
            }})
        .catch(error => {
            return res.status(400).send({
                status: 'error' + error
            });
        });
   
}

function eliminar(req, res) { 
    viajes.findOne({ '_id': req.params.id})
    .then(viajeLeido => {
        usuarios.updateOne({'_id':viajeLeido.idUsuario},{$pull:{'viajes':viajeLeido._id}})
        .then(() => {
            viajes.deleteOne({ '_id': req.params.id})
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



module.exports = { eliminar, modificar, addNuevo, recuperarTodos, recuperarMios, recuperarUno };

function anadirDias(viaje){
    let numDias=viaje.numDias;
    let fechaInicio=viaje.fechaInicio;
    for(let i=0;i<numDias;i++){
        dias.create({'idViaje':viaje._id,'fecha':fechaInicio})
        .then((diaInsertado) => {
            viajes.updateOne({"_id":viaje._id},{$push:{'dias':diaInsertado._id}}).catch(error => {
                return error;
            });
        })
        .catch(error => {
            return error;
        });
        fechaInicio=fechaInicio+1;
    } 
    return "correcto";
}

function modificarDias(nuevoViaje,viajeLeido){
    let numDias=nuevoViaje.numDias;
    let fechaInicio=nuevoViaje.fechaInicio;
    let listaDias=[];
    dias.deleteMany({"idViaje":viajeLeido._id})
    .then(() => {
        for(let i=0;i<numDias;i++){
            dias.create({'idViaje':viajeLeido._id,'fecha':fechaInicio})
            .then((diaInsertado) => {
                listaDias.push(diaInsertado._id)
            })
            .catch(error => {
                return error;
            });
            fechaInicio=fechaInicio+1;
        }
        viajes.updateOne({"_id":viajeLeido._id},{$set:{'dias':listaDias}})
            .then(()=>{
                return "correcto";
            })
            .catch(error => {
                return error;
            });

    })
    .catch(error => {
        return error;
    });
}
