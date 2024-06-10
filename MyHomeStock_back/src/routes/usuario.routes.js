import { Router } from 'express';
import { findAll, existeUsuario, create, findById, update, remove, login } from '../controllers/usuario.controller.js';
import { verifyToken } from '../../config/helpers/auth.js';

const router = Router();

// Obtener todos los usuario
router.get('/', verifyToken, findAll);

// Verificar si un usuario existe
router.get('/verificar-existencia', existeUsuario);

// Crear un nuevo usuario
router.post('/', create);

// Obtener un único usuario por su ID
router.get('/:id', verifyToken, findById);

// Actualizar un usuario por su ID
router.put('/:id', verifyToken, update);

// Eliminar un usuario por su ID
router.delete('/:id', verifyToken, remove);

// Inicio de sesión de usuario
router.post('/login', login);

export default router;
