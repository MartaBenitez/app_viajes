const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req, res, next) {
  if (req.path === '/login' || req.path === '/registro') {
    return next();
  }

  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tiene los permisos suficientes para acceder" });
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, CONFIG.SECRET_TOKEN, function(error, decoded) {
    if (error || (req.path === '/usuarios/admin' || req.path === '/viajes/admin') && decoded.rol === 'user') {
      return res.status(403).send({ message: "No tiene los permisos suficientes para acceder", error });
    }
    next();
  });
};


                /*if(decoded.rol=='user'&& decoded._id!=id){
                    console.log(decoded._id)
                    return res.status(403).send({message:"No tiene los permisos suficientes para acceder", error});
                }*/