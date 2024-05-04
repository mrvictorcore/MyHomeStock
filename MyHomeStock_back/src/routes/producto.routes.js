import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId, ajustarStock, toggleFavorito } from '../controllers/producto.controller.js';

const router = Router()

// Todos los productos
router.get('/', findAll);

// Crear un nuevo producto
router.post('/', create);

// Devuelve un único producto por su id
router.get('/:id', findById);

// Actualizar un producto por su id
router.put('/:id', update);

// Borrar un producto por su id
router.delete('/:id', remove);

// Todos los productos por usuario_id y null
router.get('/find', findByUsuarioId);

// Ruta para ajustar el stock de un producto
router.patch('/ajustarStock/:id', ajustarStock);

// Cambiar el estado de favorito de un producto
router.patch('/:id/toggleFavorito', toggleFavorito);

export default router