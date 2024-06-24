import { CompraProducto } from '../models/compra_producto.model.js';
import { handleResponse, validateFields, validateId } from '../../config/helpers/dbUtils.js';
import { Producto } from '../models/producto.model.js';

export const findAll = async (req, res) => {
    try {
        const data_compra_producto = await CompraProducto.findAll();
        handleResponse(res, null, data_compra_producto);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const create = async (req, res) => {
    const newCompraProducto = req.body;
    let errores = [];

    if (!newCompraProducto || typeof newCompraProducto !== 'object' || Object.keys(newCompraProducto).length === 0) {
        errores.push('No se recibieron datos completos');
    }

    if (!errores.length) {
        let erroresCampos = validateFields(newCompraProducto, ['id_compra', 'id_producto', 'cantidad_comprar', 'cantidad_disponible']);
        errores = [...errores, ...erroresCampos];
    }

    if (!Number.isInteger(newCompraProducto.cantidad_comprar) || newCompraProducto.cantidad_comprar <= 0) {
        errores.push('La cantidad debe ser un número entero positivo');
    }

    if (errores.length) {
        res.status(400).json({ error: true, message: 'Por favor añada todos los campos requeridos: ' + errores.join(', ') });
    } else{
        try {
            const data_compra_producto = await CompraProducto.create(newCompraProducto);
            console.log("Productos Creados:", data_compra_producto);
            handleResponse(res, null, data_compra_producto);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};

export const findById = async (req, res) => {
    const idCompra = req.params.id_compra;
    const idProducto = req.params.id_producto
    
    const idErrorCompra = validateId(idCompra);
    if (idErrorCompra) {
        return res.status(400).json({ error: true, message: idErrorCompra});
    }

    const idErrorProducto = validateId(idProducto);
    if (idErrorProducto) {
        return res.status(400).json({ error: true, message: idErrorProducto});
    }

    try {
        const data_compra_producto = await CompraProducto.findById(idCompra, idProducto);
        handleResponse(res, null, data_compra_producto);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const update = async (req, res) => {
    const idCompra = req.params.id_compra;
    const idProducto = req.params.id_producto;
    const { cantidad_disponible, cantidad_comprar } = req.body;
    let errores = [];

    const errorIdCompra = validateId(idCompra);
    if (errorIdCompra) {
        errores.push(errorIdCompra);
    }

    const errorIdProducto = validateId(idProducto);
    if (errorIdProducto) {
        errores.push(errorIdProducto);
    }

    if (!Number.isInteger(cantidad_disponible) || cantidad_disponible <= 0) {
        errores.push('La Cantidad disponible debe ser un número entero mayor que cero.');
    }

    if (cantidad_disponible > cantidad_comprar) {
        errores.push('La cantidad disponible no puede exceder la cantidad a comprar.');
    }

    if (errores.length) {
        return res.status(400).json({ error: true, message: errores.join(", ") });
    }

    const nuevaCantidad = cantidad_comprar - cantidad_disponible;

    if (nuevaCantidad <= 0) {
        try {
            const remove_compra_producto = await CompraProducto.remove(idCompra, idProducto);
            await Producto.adjustStock(idProducto, cantidad_disponible);
            return handleResponse(res, null, remove_compra_producto);
        } catch (err) {
            return handleResponse(res, err);
        }
    }

    try {
        const data_compra_producto = await CompraProducto.updateCompraProducto(idCompra, idProducto, nuevaCantidad);
        await Producto.adjustStock(idProducto, cantidad_disponible);
        handleResponse(res, null, data_compra_producto);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const remove = async (req, res) => {
    const idCompra = req.params.id_compra;
    const idProducto = req.params.id_producto;

    const idErrorCompra = validateId(idCompra);
    if (idErrorCompra) {
        return res.status(400).json({ error: true, message: idErrorCompra});
    }

    const idErrorProducto = validateId(idProducto);
    if (idErrorProducto) {
        return res.status(400).json({ error: true, message: idErrorProducto});
    }

    try {
        const data_compra_producto = await CompraProducto.remove(idCompra, idProducto);
        handleResponse(res, null, data_compra_producto);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const findByUsuarioId = async (req, res) => {
    console.log(req.params);
    const idUser = req.params.id_usuario;
    console.log("ID Usuario Recibido:", idUser);

    const idErrorUser = validateId(idUser);
    if (idErrorUser) {
        res.status(400).json({error: true, message: idErrorUser});
    }

    try {
        const data_compra_producto = await CompraProducto.findByUsuarioId(idUser);
        handleResponse(res, null, data_compra_producto);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const findByCompraId = async (req, res) => {
    const idCompra = req.params.id_compra;

    const idErrorCompra = validateId(idCompra);
    if (idErrorCompra) {
        res.status(400).json({error: true, message: idErrorCompra});
    }

    try {
        const data_compra_producto = await CompraProducto.findByCompraId(idCompra);
        handleResponse(res, null, data_compra_producto);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const getProductosDeCompra = async (req, res) => {
    const idCompra = req.params.id_compra;

    const idErrorCompra = validateId(idCompra);
    if (idErrorCompra) {
        return res.status(400).json({ error: true, message: idErrorCompra });
    }

    try {
        const data_compra_producto = await CompraProducto.getProductosDeCompraByCompraId(idCompra);
        const productosTransformados = data_compra_producto.map(producto => ({
            ...producto,
            nombreProducto: producto.nombre,
            stockProducto: producto.cantidad_stock
        }));
        handleResponse(res, null, productosTransformados);
    } catch (err) {
        handleResponse(res, err);
    }
};