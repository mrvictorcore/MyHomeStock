const express = require('express')
const router = express.Router()
const CompraProductoController = require('../controllers/compra_producto.controller');

// Todas las CompraProducto
router.get('/', CompraProductoController.findAll);

// Crear una nueva CompraProducto
router.post('/', CompraProductoController.create);

// Devuelve una única CompraProducto por su id
router.get('/:id', CompraProductoController.findById);

// Actualizar una CompraProducto por su id
router.put('/:id', CompraProductoController.update);

// Borrar una CompraProducto por su id
router.delete('/:id', CompraProductoController.delete);

// Todos los gastos por usuario_id y null
router.post('/find', CompraProductoController.findByUsuarioId);

module.exports = router