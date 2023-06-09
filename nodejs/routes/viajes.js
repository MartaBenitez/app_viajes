const express = require('express');
const router = express.Router();

const controller = require('../controllers/viajesController');

router.get('/misviajes/:id', controller.recuperarMios);
router.get('/:id', controller.recuperarUno);
router.post('/', controller.addNuevo);  
router.put('/:id', controller.modificar);
router.delete('/:id', controller.eliminar);

module.exports = router;