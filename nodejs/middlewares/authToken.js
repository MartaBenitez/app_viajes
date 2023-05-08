const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req,res,next){
    if(req.path!='/auth/login' &&  req.path!='/auth/registro'){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message:"No tiene los permisos suficientes para acceder", error});
                if((req.path=='/usuarios/admin' || req.path=='/viajes/admin') && decoded.rol=='user'){
                    return res.status(403).send({message:"No tiene los permisos suficientes para acceder", error});
                }
                /*if(decoded.rol=='user'&& decoded._id!=id){
                    console.log(decoded._id)
                    return res.status(403).send({message:"No tiene los permisos suficientes para acceder", error});
                }*/
                next();
            });
        }else res.status(403).send({message:"No tiene los permisos suficientes para acceder"});
    }else next();
}