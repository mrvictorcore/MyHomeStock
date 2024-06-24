import { Router } from 'express';
import { verifyToken } from '../../config/helpers/auth.js';
import { findAll, create, findById, update, remove, findByUsuarioId, ajustarStockRestar, ajustarStockSumar, toggleFavorito, findFavoritesOrStock, updateStock } from '../controllers/producto.controller.js';

const router = Router()

// Todos los productos
router.get('/', findAll);

// Crear un nuevo producto
router.post('/', verifyToken, create);

// Devuelve un único producto por su id
router.get('/:id', verifyToken, findById);

// Actualizar un producto por su id
router.put('/update_producto/:id', verifyToken, update);

// Borrar un producto por su id
router.delete('/delete_producto/:id', verifyToken, remove);

// Todos los productos por id_usuario
router.get('/usuario/:id_usuario/all_productos_user', verifyToken, findByUsuarioId);

// Todos los productos por id_usuario que sean favoritos y tengan stock superior a cero
router.get('/usuario/:id_usuario/productos_favoritos_stock', verifyToken, findFavoritesOrStock);

// Ruta para restar el stock de un producto
router.patch('/update_stock/:id', verifyToken, updateStock);

// Ruta para restar el stock de un producto
router.patch('/ajustar_stock_restar/:id', verifyToken, ajustarStockRestar);

// Ruta para sumar el stock de un producto
router.patch('/ajustar_stock_sumar/:id', verifyToken, ajustarStockSumar);

// Cambiar el estado de favorito de un producto
router.patch('/toggle_favorito/:id', verifyToken, toggleFavorito);

export default router;
