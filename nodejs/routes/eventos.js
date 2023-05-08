const express = require('express');
const router = express.Router();

const controller = require('../controllers/eventosController');

router.get('/miseventos/:id', controller.recuperarTodos); //recuperar todos los eventos de un dia
router.get('/:id', controller.recuperarUno);
router.post('/', controller.addNuevo);
router.put('/:id', controller.modificar);
router.delete('/:id', controller.eliminar);

module.exports = router;