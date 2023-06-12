const express = require('express');
const router = express.Router();

const controller = require('../controllers/eventosController');

router.get('/miseventos/:id', controller.recuperarTodos);
router.post('/', controller.addNuevo);
router.put('/:id', controller.modificar);
router.delete('/:id', controller.eliminar);

module.exports = router;