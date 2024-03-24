const express = require('express')
const router = express.Router()
const tipo_categoriaController = require('../controllers/tipo_categoria.controller');

// Todas las tipo_categorias
router.get('/', tipo_categoriaController.findAll);

// Crear una nueva tipo_categoria
router.post('/', tipo_categoriaController.create);

// Devuelve una única tipo_categoria por su id
router.get('/:id', tipo_categoriaController.findById);

// Actualizar una tipo_categoria por su id
router.put('/:id', tipo_categoriaController.update);

// Borrar una tipo_categoria por su id
router.delete('/:id', tipo_categoriaController.delete);

// Todos los gastos por usuario_id y null
router.post('/find', tipo_categoriaController.findByUsuarioId);

module.exports = router