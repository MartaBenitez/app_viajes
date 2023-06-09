const express = require('express');
const router = express.Router();

const controller = require('../controllers/diasController');

router.get('/:id', controller.recuperarUno);
router.get('/todos/:id',controller.recuperarDias);

module.exports = router;