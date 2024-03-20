const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoria.controller');

// Todos los categorias
router.get('/', categoriaController.findAll);

// Crear un nuevo categoria
router.post('/', categoriaController.create);

// Devuelve un único categoria por su id
router.get('/:id', categoriaController.findById);

// Actualizar un categoria por su id
router.put('/:id', categoriaController.update);

// Borrar un categoria por su id
router.delete('/:id', categoriaController.delete);

// Todos los categorias por usuario_id y null
router.post('/find', categoriaController.findByUsuarioId);

module.exports = router