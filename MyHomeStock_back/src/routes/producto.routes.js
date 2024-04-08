const express = require('express')
const router = express.Router()
const productoController = require('../controllers/producto.controller');

// Todos los productos
router.get('/', productoController.findAll);

// Crear un nuevo producto
router.post('/', productoController.create);

// Devuelve un único producto por su id
router.get('/:id', productoController.findById);

// Actualizar un producto por su id
router.put('/:id', productoController.update);

// Borrar un producto por su id
router.delete('/:id', productoController.delete);

// Todos los productos por usuario_id y null
router.post('/find', productoController.findByUsuarioId);

// Ruta para ajustar el stock de un producto
router.patch('/ajustarStock/:id', productoController.ajustarStock);

// Cambiar el estado de favorito de un producto
router.patch('/:id/toggleFavorito', productoController.toggleFavorito);

module.exports = router