import { Compra } from '../models/compra.model.js';
import { isFunction, handleResponse } from '../../config/helpers/dbUtils.js';

export const findAll = async (req, res) => {
    try {
        const data_compra = await new Promise((resolve, reject) => {
            Compra.findAll((err, data_compra) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data_compra);
                }
            });
        });

        if (isFunction(handleResponse)) {
            handleResponse(res, () => Promise.resolve(data_compra));
        } else {
            console.error('handleResponse no es una función válida');
        }
    } catch (err) {
        handleResponse(res, () => Promise.reject(err));
    }
};

export const create = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ error: true, message: 'Por favor añade todos los campos requeridos' });
        } else {
            const newCompra = new Compra(req.body);
            const data_compra = await new Promise((resolve, reject) => {
                Compra.create(newCompra, (err, data_compra) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data_compra);
                    }
                });
            });

            if (isFunction(handleResponse)) {
                handleResponse(res, () => Promise.resolve(data_compra));
            } else {
                console.error('handleResponse no es una función válida');
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: err.message });
    }
};

export const findById = async (req, res) => {
    const idCompra = req.params.id;

    try {
        const data_compra = await new Promise((resolve, reject) => {
            Compra.findById(idCompra, (err, data_compra) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data_compra);
                }
            });
        });

        if (isFunction(handleResponse)) {
            handleResponse(res, () => Promise.resolve(data_compra));
        } else {
            console.error('handleResponse no es una función válida');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: err.message });
    }
};

export const update = async (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).json({ error: true, message: 'Por favor añade todos los campos requeridos' });
    } else {
        const newCompra = req.body;
        const idCompra = req.params.id;

        try {
            const data_compra = await new Promise((resolve, reject) => {
                Compra.update(idCompra, new Compra(newCompra), (err, data_compra) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data_compra);
                    }
                });
            });

            if (isFunction(handleResponse)) {
                handleResponse(res, () => Promise.resolve(data_compra));
            } else {
                console.error('handleResponse no es una función válida');
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: true, message: err.message });
        }
    }
};

export const remove = async (req, res) => {
    const idCompra = req.params.id;

    try {
        const data_compra = await new Promise((resolve, reject) => {
            Compra.remove(idCompra, (err, data_compra) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data_compra);
                }
            });
        });

        if (isFunction(handleResponse)) {
            handleResponse(res, () => Promise.resolve(data_compra));
        } else {
            console.error('handleResponse no es una función válida');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: err.message });
    }
};

export const findByUsuarioId = async (req, res) => {
    const idUser = req.body.usuario_id;

    try {
        const data_compra = await new Promise((resolve, reject) => {
            Compra.findByUsuarioId(idUser, (err, data_compra) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data_compra);
                }
            });
        });

        if (isFunction(handleResponse)) {
            handleResponse(res, () => Promise.resolve(data_compra));
        } else {
            console.error('handleResponse no es una función válida');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: err.message });
    }
};

export const findByDescripcion = async (req, res) => {
    const compraDescripcion = req.params.descripcion;

    try {
        const data_compra = await new Promise((resolve, reject) => {
            Compra.findByDescripcion(compraDescripcion, (err, data_compra) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data_compra);
                }
            });
        });
        
        if (isFunction(handleResponse)) {
            handleResponse(res, () => Promise.resolve(data_compra));
        } else {
            console.error('handleResponse no es una función válida');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: err.message });
    }
};