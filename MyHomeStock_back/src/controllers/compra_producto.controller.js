import { CompraProducto } from '../models/compra_producto.model.js';
import { handleResponse, validateFields, validateId } from '../../config/helpers/dbUtils.js';

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
        let erroresCampos = validateFields(newCompraProducto, ['id_compra', 'id_producto', 'cantidad']);
        errores = [...errores, ...erroresCampos];
    }

    if (!Number.isInteger(newCompraProducto.cantidad) || newCompraProducto.cantidad <= 0) {
        errores.push('La cantidad debe ser un número entero positivo');
    }

    if (errores.length) {
        res.status(400).send({ error: true, message: 'Por favor añada todos los campos requeridos: ' + errores.join(', ') });
    } else{
        try {
            const data_compra_producto = await CompraProducto.create(newCompraProducto);
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
    const updateCompraProducto = req.body;
    const idCompra = req.body.id_compra;
    const idProducto = req.body.id_producto;
    let errores = [];

    if (!updateCompraProducto || typeof updateCompraProducto !== 'object' || Object.keys(updateCompraProducto).length === 0) {
        errores.push('No se recibieron datos completos');
    }
    
    const idErrorCompra = validateId(idCompra);
    if (idErrorCompra) {
        return res.status(400).json({ error: true, message: idErrorCompra});
    }

    const idErrorProducto = validateId(idProducto);
    if (idErrorProducto) {
        return res.status(400).json({ error: true, message: idErrorProducto});
    }

    if (!Number.isInteger(updateCompraProducto.cantidad) || updateCompraProducto.cantidad <= 0) {
        errores.push('La cantidad debe ser un número entero positivo');
    }

    if (!errores.length) {
        let erroresCampos = validateFields(updateCompraProducto, ['id_compra', 'id_producto', 'cantidad'])
        errores = [...errores, ...erroresCampos];
    }

    if (errores.length) {
        res.status(400).json({ error: true, message: 'Por favor añade todos los campos requeridos: ' + errores.join(', ') });
    } else {
        try {
            const data_compra_producto = await CompraProducto.update(idCompra, idProducto, updateCompraProducto);
            handleResponse(res, null, data_compra_producto);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};

export const remove = async (req, res) => {
    const idCompra = req.params.idCompra;
    const idProducto = req.params.idProducto;

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
    const idUser = req.query.id_usuario;

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
    const idCompra = req.params.id;

    const idErrorCompra = validateId(idCompra);
    if (idErrorCompra) {
        res.status(400).json({error: true, message: idErrorCompra});
    }

    try {
        const data_compra_producto = await CompraProducto.getProductosDeCompraByCompraId(idCompra);
        handleResponse(res, null, data_compra_producto);
    } catch (err) {
        handleResponse(res, err);
    }
};