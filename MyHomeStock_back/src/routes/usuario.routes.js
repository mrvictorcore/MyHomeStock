const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Obtener todos los usuarios
router.get('/', usuarioController.findAll);

// Verificar si un usuario existe
router.get('/verificar-existencia', usuarioController.existeUsuario);

// Crear un nuevo usuario
router.post('/', usuarioController.create);

// Obtener un único usuario por su ID
router.get('/:id', usuarioController.findById);

// Actualizar un usuario por su ID
router.put('/:id', usuarioController.update);

// Eliminar un usuario por su ID
router.delete('/:id', usuarioController.delete);

// Inicio de sesión de usuario
router.post('/login', usuarioController.login);

module.exports = router;
