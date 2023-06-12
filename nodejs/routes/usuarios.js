const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuariosController');

router.get('/admin/', controller.recuperarTodos);
router.get('/:id', controller.recuperarUno); 
router.post('/', controller.addNuevo);  
router.put('/:id', controller.modificar);
router.put('/contrasena/:id', controller.modificarContrasena)
router.delete('/:id', controller.eliminar);
router.delete('/admin/:id', controller.suspender);

module.exports = router;