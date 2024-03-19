const express = require('express')
const router = express.Router()
const inventarioController = require('../controllers/inventario.controller');

// Todos los inventarios
router.get('/', inventarioController.findAll);

// Crear un nuevo inventario
router.post('/', inventarioController.create);

// Devuelve un único inventario por su id
router.get('/:id', inventarioController.findById);

// Actualizar un inventario por su id
router.put('/:id', inventarioController.update);

// Borrar un inventario por su id
router.delete('/:id', inventarioController.delete);

// Todos los inventarios por usuario_id y null
router.post('/find', inventarioController.findByUsuarioId);

module.exports = router