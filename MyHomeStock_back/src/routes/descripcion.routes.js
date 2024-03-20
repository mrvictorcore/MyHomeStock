const express = require('express')
const router = express.Router()
const descripcionController = require('../controllers/descripcion.controller');

// Todas las descripcions
router.get('/', descripcionController.findAll);

// Crear una nueva descripcion
router.post('/', descripcionController.create);

// Devuelve una única descripcion por su id
router.get('/:id', descripcionController.findById);

// Actualizar una descripcion por su id
router.put('/:id', descripcionController.update);

// Borrar una descripcion por su id
router.delete('/:id', descripcionController.delete);

// Todos los gastos por usuario_id y null
router.post('/find', descripcionController.findByUsuarioId);

module.exports = router