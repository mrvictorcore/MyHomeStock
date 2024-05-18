import { Usuario } from '../models/usuario.model.js';
import { handleResponse, validateFields, validateId } from '../../config/helpers/dbUtils.js';

export const findAll = async (req, res) => {
    try {
        const data_usuario = await Usuario.findAll();
        handleResponse(res, null, data_usuario);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const existeUsuario = async (req, res) => {
    const new_email = req.query.email;

    try {
        const data_usuario = await Usuario.existeUsuario(new_email);
        handleResponse(res, null, data_usuario);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const create = async (req, res) => {
    const new_usuario = req.body;
    let errores = [];

    if (!new_usuario || typeof new_usuario !== 'object' || Object.keys(new_usuario).length === 0) {
        errores.push('No se recibieron los datos completos');
    }

    if (!errores.length) {
        let erroresCampos = validateFields(new_usuario, ['nombre', 'apellido', 'email', 'password']);
        errores = [...errores, ...erroresCampos];
    }

    if (errores.length) {
        res.status(400).json({ error: true, message: 'Por favor añada todos los camopos requeridos: ' + errores.join(', ') });
    } else {
        try {
            const data_usuario = await Usuario.create(new_usuario);
            handleResponse(res, null, data_usuario);
        } catch (err) {
            handleResponse(res, err)
        }
    }
};

export const findById = async (req, res) => {
    const idUser = req.params.id;

    try {
        const data_usuario = await Usuario.findById(idUser);
        handleResponse(res, null, data_usuario);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const update = async (req, res) => {
    const idUser = req.params.id;
    const updateUser = req.body;
    let errores = [];

    const errorIdUser = validateId(idUser);
    if (errorIdUser) {
        errores.push(errorIdUser);
    }

    if (!updateUser || typeof updateUser !== 'object' || Object.keys(updateUser).length === 0) {
        errores.push('No se recibieron los datos completos');
    }

    if (errores.length) {
        res.status(400).json({ error: true, message: 'Por favor añada todos los camopos requeridos: ' + errores.join(', ') });
    } else {
        try {
            const data_usuario = await Usuario.update(idUser, updateUser);
            handleResponse(res, null, data_usuario);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};

export const remove = async (req, res) => {
    const idUser = req.params.id;

    const errorIdUser = validateId(idUser);
    if (errorIdUser) {
        return res.status(400).json({ error: true, message: errorIdUser});
    }

    try {
        const data_usuario = await Usuario.remove(idUser);
        handleResponse(res, null, data_usuario);
    } catch (err) {
        handleResponse(res, err);
    }
};

export const login = async (req, res) => {
    const usuario = req.body;

    if (!usuario || typeof usuario !== 'object' || Object.keys(usuario).length === 0) {
        res.status(400).json({ error:true, message: 'Por favor añada todos los campos requeridos' });
    } else {
        try {
            const data_usuario = await Usuario.login(usuario);
            handleResponse(res, null, data_usuario);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};