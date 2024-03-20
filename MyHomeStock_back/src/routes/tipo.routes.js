const express = require('express')
const router = express.Router()
const tipoController = require('../controllers/tipo.controller');

// Todas las tipos
router.get('/', tipoController.findAll);

// Crear una nueva tipo
router.post('/', tipoController.create);

// Devuelve una única tipo por su id
router.get('/:id', tipoController.findById);

// Actualizar una tipo por su id
router.put('/:id', tipoController.update);

// Borrar una tipo por su id
router.delete('/:id', tipoController.delete);

// Todos los gastos por usuario_id y null
router.post('/find', tipoController.findByUsuarioId);

module.exports = router