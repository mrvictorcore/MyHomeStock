const express = require('express')
const router = express.Router()
const compraController = require('../controllers/compra.controller');

// Todas las compras
router.get('/', compraController.findAll);

// Crear una nueva compra
router.post('/', compraController.create);

// Devuelve una única compra por su id
router.get('/:id', compraController.findById);

// Actualizar una compra por su id
router.put('/', compraController.update);

// Borrar una compra por su id
router.delete('/:id', compraController.delete);

// Todos los gastos por usuario_id y null
router.get('/find', compraController.findByUsuarioId);

// Ruta para actualizar la cantidad de una compra
// router.put('/:id/cantidad', compraController.updateCantidadCompra);

module.exports = router