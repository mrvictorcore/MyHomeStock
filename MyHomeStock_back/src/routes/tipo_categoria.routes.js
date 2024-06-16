import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId } from '../controllers/tipo_categoria.controller.js';

const router = Router()

// Todas las TipoCategorias
router.get('/', findAll);

// Crear una nueva TipoCategoria
router.post('/', create);

// Devuelve una única TipoCategoria por su id_tipo_categoria
router.get('/:id_tipo_categoria', findById);

// Actualizar una TipoCategoria por su id_tipo_categoria
router.patch('/:id_tipo_categoria', update);

// Borrar una TipoCategoria por su id_tipo_categoria
router.delete('/:id_tipo_categoria', remove);

// Todos los tipo_categoria por id_usuario y null
router.get('/usuario/:id_usuario', findByUsuarioId);

export default router