import { Router } from 'express';
import { verifyToken } from '../../config/helpers/auth.js';
import { findAll, create, findById, update, remove, findByUsuarioId, findByDescripcion } from '../controllers/compra.controller.js';

const router = Router()

// Todas las compras
router.get('/', findAll);

// Crear una nueva compra
router.post('/', verifyToken, create);

// Devuelve una única compra por su id_compra
router.get('/:id_compra', verifyToken, findById);

// Actualiza la descripcion de una compra por su id_compra
router.patch('/:id_compra', verifyToken, update);

// Borrar una compra por su id_compra
router.delete('/:id_compra', verifyToken, remove);

// Todas las compras por id_usuario
router.get('/usuario/:id_usuario', verifyToken, findByUsuarioId);

// Ruta para obtener la descripción de una compra
router.get('/:descripcion', verifyToken, findByDescripcion);

export default router