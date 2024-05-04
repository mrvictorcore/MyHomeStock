import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId, findByDescripcion } from '../controllers/compra.controller.js';

const router = Router()

// Todas las compras
router.get('/', findAll);

// Crear una nueva compra
router.post('/', create);

// Devuelve una única compra por su id
router.get('/:id', findById);

// Actualizar una compra por su id
router.put('/:id', update);

// Borrar una compra por su id
router.delete('/:id', remove);

// Todos los gastos por usuario_id y null
router.get('/find', findByUsuarioId);

// Ruta para obtener la descripción de una compra
router.get('/:descripcion', findByDescripcion);

export default router