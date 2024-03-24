const express = require('express')
const router = express.Router()
const TipoCategoriaController = require('../controllers/tipo_categoria.controller');

// Todas las TipoCategorias
router.get('/', TipoCategoriaController.findAll);

// Crear una nueva TipoCategoria
router.post('/', TipoCategoriaController.create);

// Devuelve una única TipoCategoria por su id
router.get('/:id', TipoCategoriaController.findById);

// Actualizar una TipoCategoria por su id
router.put('/:id', TipoCategoriaController.update);

// Borrar una TipoCategoria por su id
router.delete('/:id', TipoCategoriaController.delete);

// Todos los gastos por usuario_id y null
router.post('/find', TipoCategoriaController.findByUsuarioId);

module.exports = router