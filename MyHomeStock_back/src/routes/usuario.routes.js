import { Router } from 'express';
import { findAll, existeUsuario, create, findById, update, remove, login } from '../controllers/usuario.controller.js';

const router = Router();

// Obtener todos los usuario
router.get('/', findAll);

// Verificar si un usuario existe
router.get('/verificar-existencia', existeUsuario);

// Crear un nuevo usuario
router.post('/', create);

// Obtener un único usuario por su ID
router.get('/:id', findById);

// Actualizar un usuario por su ID
router.put('/:id', update);

// Eliminar un usuario por su ID
router.delete('/:id', remove);

// Inicio de sesión de usuario
router.post('/login', login);

export default router;
