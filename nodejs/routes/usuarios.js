const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuariosController');

router.get('/admin/', controller.recuperarTodos);  //ruta exclusiva para admins
router.get('/:id', controller.recuperarUno); //siempre comprobar que su id del token coincide con el que manda por get put o delete
router.post('/', controller.addNuevo);  //ver que hacer con este. se puede acabar usando solo por admin para añadir otros admins
router.put('/:id', controller.modificar);
router.delete('/:id', controller.eliminar);

module.exports = router;