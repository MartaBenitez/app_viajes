const express = require('express');
const router = express.Router();

const controller = require('../controllers/viajesController');

router.get('/admin/', controller.recuperarTodos);  //ruta exclusiva para admins
router.get('/misviajes/:id', controller.recuperarMios);
router.get('/:id', controller.recuperarUno); //siempre comprobar que su id del token coincide con el que manda por get put o delete
router.post('/', controller.addNuevo);  
router.put('/:id', controller.modificar);
router.delete('/:id', controller.eliminar);

module.exports = router;