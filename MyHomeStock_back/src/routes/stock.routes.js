const express = require('express')
const router = express.Router()
const stockController = require('../controllers/stock.controller');

// Todas las stocks
router.get('/', stockController.findAll);

// Crear una nueva stock
router.post('/', stockController.create);

// Devuelve una única stock por su id
router.get('/:id', stockController.findById);

// Actualizar una stock por su id
router.put('/:id', stockController.update);

// Borrar una stock por su id
router.delete('/:id', stockController.delete);

// Todos los gastos por usuario_id y null
router.post('/find', stockController.findByUsuarioId);

module.exports = router