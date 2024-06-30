import { Router } from 'express';
import { findAll, create, findById, update, remove, findByUsuarioId, findByCompraId, getProductosDeCompra, confirmarCompra } from '../controllers/compra_producto.controller.js';

const router = Router()

// Todos los compra_producto
router.get('/', findAll);

// Crear un nuevo compra_producto
router.post('/', create);

// Obtener un compra_producto específico por id_compra e id_producto
router.get('/detalle/:id_compra/:id_producto', findById);

// Actualizar un compra_producto específico por id_compra e id_producto. Además, actualiza el stock de productos y borra los compra_producto si se compra la cantidad_comprar deseada en totalidad.
router.patch('/detalle/:id_compra/:id_producto', update);

// Eliminar una compra_producto específica por id_compra e id_producto
router.delete('/detalle/:id_compra/:id_producto', remove);

// Todos los compra_producto por id_usuario
router.get('/usuario/:id_usuario', findByUsuarioId);

// Todos los compra_productos de una compra específica por ID de la compra
router.get('/compra/:id_compra', findByCompraId);

// Obtener todos los productos y compra_productos de una compra específica por ID.
router.get('/compra/:id_compra/productos_with_CP', getProductosDeCompra);

// Actualiza el stock de los productos comprados y borra los compraProductos comprados de la lista de la compra
router.post('/confirmar/:id_compra', confirmarCompra);

export default router