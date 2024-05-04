import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId } from '../controllers/tipo_categoria.controller.js';

const router = Router()

// Todas las TipoCategorias
router.get('/', findAll);

// Crear una nueva TipoCategoria
router.post('/', create);

// Devuelve una única TipoCategoria por su id
router.get('/:id', findById);

// Actualizar una TipoCategoria por su id
router.put('/:id', update);

// Borrar una TipoCategoria por su id
router.delete('/:id', remove);

// Todos los gastos por usuario_id y null
router.post('/find', findByUsuarioId);

export default router