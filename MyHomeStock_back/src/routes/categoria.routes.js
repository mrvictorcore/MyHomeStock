import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId } from '../controllers/categoria.controller.js';

const router = Router()

// Todos los categorias
router.get('/', findAll);

// Crear un nuevo categoria
router.post('/', create);

// Devuelve un único categoria por su id_categoria
router.get('/:id_categoria', findById);

// Actualizar un categoria por su id_categoria
router.patch('/:id_categoria', update);

// Borrar un categoria por su id_categoria
router.delete('/:id_categoria', remove);

// Todas las categorias por id_usuario y null
router.get('/usuario/:id_usuario', findByUsuarioId);

export default router