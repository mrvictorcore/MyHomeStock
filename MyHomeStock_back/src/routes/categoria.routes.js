import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId } from '../controllers/categoria.controller.js';

const router = Router()

// Todos los categorias
router.get('/', findAll);

// Crear un nuevo categoria
router.post('/', create);

// Devuelve un único categoria por su id
router.get('/:id', findById);

// Actualizar un categoria por su id
router.put('/:id', update);

// Borrar un categoria por su id
router.delete('/:id', remove);

// Todos los categorias por usuario_id y null
router.post('/find', findByUsuarioId);

export default router