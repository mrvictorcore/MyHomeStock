import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId, findByDescripcion } from '../controllers/compra.controller.js';

const router = Router()

// Todas las compras
router.get('/', findAll);

// Crear una nueva compra
router.post('/', create);

// Devuelve una única compra por su id_compra
router.get('/:id_compra', findById);

// Actualiza la descripcion de una compra por su id_compra
router.patch('/:id_compra', update);

// Borrar una compra por su id_compra
router.delete('/:id_compra', remove);

// Todas las compras por id_usuario
router.get('/usuario/:id_usuario', findByUsuarioId);

// Ruta para obtener la descripción de una compra
router.get('/:descripcion', findByDescripcion);

export default router