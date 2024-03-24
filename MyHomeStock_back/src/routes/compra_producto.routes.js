const express = require('express')
const router = express.Router()
const compra_productoController = require('../controllers/compra_producto.controller');

// Todas las compra_producto
router.get('/', compra_productoController.findAll);

// Crear una nueva compra_producto
router.post('/', compra_productoController.create);

// Devuelve una única compra_producto por su id
router.get('/:id', compra_productoController.findById);

// Actualizar una compra_producto por su id
router.put('/:id', compra_productoController.update);

// Borrar una compra_producto por su id
router.delete('/:id', compra_productoController.delete);

// Todos los gastos por usuario_id y null
router.post('/find', compra_productoController.findByUsuarioId);

module.exports = router