import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId, findByCompraId, getProductosDeCompra } from '../controllers/compra_producto.controller.js';

const router = Router()

// Todas las CompraProducto
router.get('/', findAll);

// Crear una nueva CompraProducto
router.post('/', create);

// Obtener una CompraProducto específica por idCompra e idProducto
router.get('/:idCompra/:idProducto', findById);

// Actualizar una CompraProducto específica por idCompra e idProducto
router.put('/:idCompra/:idProducto', update);

// Eliminar una CompraProducto específica por idCompra e idProducto
router.delete('/:idCompra/:idProducto', remove);

// Todos los gastos por usuario_id y null
router.post('/find', findByUsuarioId);

// Todos los productos de una compra específica por ID de la compra
router.get('/:id/compra_producto', findByCompraId);

// Obtener todos los productos de una compra específica por ID de la compra y le añade la cantidad del compraProducto
router.get('/compras/:id/productosConCantidad', getProductosDeCompra);

export default router