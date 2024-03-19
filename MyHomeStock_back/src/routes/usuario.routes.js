const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario.controller');

// Todos los usuarios
router.get('/', usuarioController.findAll);

// Verificar si el usuario existe
router.get('/verificar-existencia', usuarioController.existeUsuario);

// Crear un nuevo usuario
router.post('/', usuarioController.create);

// Devuelve un único usuario por su id
router.get('/:id', usuarioController.findById);

// Actualizar un usuario por su id
router.put('/:id', usuarioController.update);

// Borrar un usuario por su id
router.delete('/:id', usuarioController.delete);
// Login
router.post('/login', usuarioController.login);

module.exports = router
