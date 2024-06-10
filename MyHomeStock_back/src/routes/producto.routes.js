import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId, ajustarStock, toggleFavorito, findFavoritesOrStock } from '../controllers/producto.controller.js';

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

// Todos los productos por id_usuario
router.get('/usuario/:id_usuario/all_productos_user', findByUsuarioId);

// Todos los productos por id_usuario que sean favoritos y tengan stock superior a cero
router.get('/usuario/:id_usuario/productos_favoritos_stock', findFavoritesOrStock);

// Ruta para ajustar el stock de un producto
router.patch('/ajustar_stock/:id', ajustarStock);

// Cambiar el estado de favorito de un producto
router.patch('/toggle_favorito/:id', toggleFavorito);

export default router