import { Compra } from '../models/compra.model.js';
import { handleResponse, validateFields, validateId } from '../../config/helpers/dbUtils.js';

export const findAll = async (req, res) => {
    try {
        const data_compra = await Compra.findAll();
        handleResponse(res, null, data_compra);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const create = async (req, res) => {
    const newCompra = req.body;
    let errores = [];

    if (!newCompra || typeof newCompra !== 'object' || Object.keys(newCompra).length === 0) {
        errores.push('No se recibieron datos completos');
    }

    if (!errores.length) {
        let erroresCampos = validateFields(newCompra, ['descripcion', 'id_usuario']);
        errores = [...errores, ...erroresCampos];
    }
    
    if (errores.length) {
        res.status(400).json({ error: true, message: 'Por favor añade todos los campos requeridos: ' + errores.join(', ') });
    } else {
        try {
            const data_compra = await Compra.create(newCompra);
            handleResponse(res, null, data_compra);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};

export const findById = async (req, res) => {
    const idCompra = req.params.id;

    const idError = validateId(idCompra);
    if (idError) {
        return res.status(400).json({ error: true, message: idError });
    }

    try {
        const data_compra = await Compra.findById(idCompra);
        handleResponse(res, null, data_compra);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const update = async (req, res) => {
    const updateCompra = req.body;
    const idCompra = req.params.id;
    let errores = [];

    // Verificar que se haya recibido un objeto con datos para actualizar
    if (!updateCompra || typeof updateCompra !== 'object' || Object.keys(updateCompra).length === 0) {
        errores.push('No se recibieron datos completos');
    }

    // Validar el ID proporcionado primero
    const idError = validateId(idCompra);
    if (idError) {
        errores.push(idError);
    }

    // Si no hay errores previos, verificar campos específicos requeridos para la actualización
    if (!errores.length) {
        let erroresCampos = validateFields(updateCompra, ['descripcion']);
        errores = [...errores, ...erroresCampos];
    }

    // Manejar los errores acumulados o proceder con la actualización
    if (errores.length) {
        res.status(400).json({ error: true, message: 'Por favor añade todos los campos requeridos: ' + errores.join(', ') });
    } else {
        try {
            const data_compra = await Compra.update(idCompra, updateCompra);
            handleResponse(res, null, data_compra);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};

export const remove = async (req, res) => {
    const idCompra = req.params.id;

    const idError = validateId(idCompra);
    if (idError) {
        return res.status(400).json({ error: true, message: idError });
    }

    try {
        const data_compra = await Compra.remove(idCompra);
        handleResponse(res, null, data_compra);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const findByUsuarioId = async (req, res) => {
    const idUser = req.body.usuario_id;

    const idError = validateId(idUser);
    if (idError) {
        return res.status(400).json({ error: true, message: idError });
    }

    try {
        const data_compra = await Compra.findByUsuarioId(idUser);
        handleResponse(res, null, data_compra);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const findByDescripcion = async (req, res) => {
    const compraDescripcion = req.params.descripcion;

    try {
        const data_compra = await Compra.findByDescripcion(compraDescripcion);
        handleResponse(res, null, data_compra);
    } catch (err) {
        handleResponse(res, err);
    }
};