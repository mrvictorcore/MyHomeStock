import { Producto } from '../models/producto.model.js';
import { handleResponse, validateFields, validateId } from '../../config/helpers/dbUtils.js';

export const findAll = async (req, res) => {
  try {
    const data_producto = await Producto.findAll();
    handleResponse(res, null, data_producto);
  } catch (err) {
    handleResponse(res, err);
  }
};

export const create = async (req, res) => {
  const newProducto = req.body;
  let errores = [];

  if (!newProducto || typeof newProducto !== 'object' || Object.keys(newProducto).length === 0) {
    errores.push('No se recibieron datos completos');
  }

  if (!errores.length) {
    let erroresCampos = validateFields(newProducto, ['id_usuario', 'id_categoria', 'nombre', 'descripcion', 'cantidad_stock', 'cantidad_min_mensual', 'favorito']);
    errores = [...errores, ...erroresCampos];
  }

  if (errores.length) {
    res.status(400).json({error: true, message: 'Por favor añade todos los campos requeridos: ' + errores.join(', ')});
  } else {
    try {
      const data_producto = await Producto.create(newProducto);
      handleResponse(res, null, data_producto);
    } catch (err) {
      handleResponse(res, err);
    }
  }
};

export const findById = async (req, res) => {
  const idProducto = req.params.id
  
  const idError = validateId(idProducto);
  if (idError) {
    return res.status(400).json({error: true, message: idError});
  }

  try {
    const data_producto = await Producto.findById(idProducto);
    handleResponse(res, null, data_producto);
  } catch (err) {
    handleResponse(res, err);
  }
};

export const update = async (req, res) => {
  const updateProducto = req.body;
  let errores = [];

  if (!updateProducto || typeof updateProducto !== 'object' || Object.keys(updateProducto).length === 0) {
    errores.push('No se recibieron datos completos');
  }

  if (!errores.length) {
    let erroresCampos = validateFields(updateProducto, ['id', 'id_categoria', 'nombre', 'descripcion', 'cantidad_stock', 'cantidad_min_mensual', 'favorito']);
    errores = [...errores, ...erroresCampos];
  }

  if (errores.length) {
    res.status(400).json({error: true, message: 'Por favor añade todos los campos requeridos: ' + errores.join(', ')});
  } else {
    try {
      const data_producto = await Producto.update(updateProducto);
      handleResponse(res, null, data_producto);
    } catch (err) {
      handleResponse(res, err);
    }
  }
};

export const remove = async (req, res) => {
  const idProducto = req.params.id;

  const idError = validateId(idProducto);
  if (idError) {
    return res.status(400).json({ error: true, message: idError });
  }

  try {
    const data_producto = await Producto.remove(idCompra);
    handleResponse(res, null, data_producto);
  } catch (err) {
    handleResponse(res, err);
  }
};

export const findByUsuarioId = async (req, res) => {
  const idUser = req.params.id_usuario;

  const idError = validateId(idUser);
  if (idError) {
    return res.status(400).json({ error: true, message: idError });
  }

  try {
    const data_producto = await Producto.findByUsuarioId(idUser);
    handleResponse(res, null, data_producto);
  } catch (err) {
    handleResponse(res, err);
  }
};

export const findFavoritesOrStock = async (req, res) => {
  const idUser = req.params.id_usuario;

  const idError = validateId(idUser);
  if (idError) {
    return res.status(400).json({ error: true, message: idError });
  }

  try {
    const data_producto = await Producto.findFavoritesOrStock(idUser);
    handleResponse(res, null, data_producto);
  } catch (err) {
    handleResponse(res, err);
  }
};

export const toggleFavorito = async (req, res) => {
  const idProducto = req.params.id;

  const idError = validateId(idProducto);
  if (idError) {
    return res.status(400).json({ error: true, message: idError });
  }

  try {
      const resFavorito = await Producto.getFavorito(idProducto);

      if (!resFavorito || resFavorito.length === 0) {
        return res.status(404).json({ error: true, message: "Producto no encontrado" });
      }

      let productoFavorito = resFavorito[0].favorito;
      let nuevoEstadoFavorito = productoFavorito ? 0 : 1; // true/false = 1/0

      const data_producto = await Producto.toggleFavorito(idProducto, nuevoEstadoFavorito);
      handleResponse(res, null, data_producto);
  } catch (err) {
      handleResponse(res, err);
  }
};

export const ajustarStockRestar = async (req, res) => {
  const { idProducto, cantidadAjuste } = req.body;
  let errores = [];

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    errores.push('No se recibieron datos completos para el ajuste de stock');
  }

  if (!errores.length) {
    let erroresCampos = validateFields(req.body, ['idProducto', 'cantidadAjuste']);
    errores = [...errores, ...erroresCampos];
  }

  if (!errores.length && (typeof cantidadAjuste !== 'number' || cantidadAjuste == null)) {
    errores.push('La cantidad de ajuste debe ser un número válido');
  }

  if (errores.length) {
    res.status(400).json({error: true, message: 'Por favor revisa los campos requeridos: ' + errores.join(', ')});
  } else {
    try {
      const resultadoAjuste = await Producto.adjustStockRestar(idProducto, cantidadAjuste);
      handleResponse(res, null, resultadoAjuste);
    } catch (err) {
      handleResponse(res, err);
    }
  }
};

export const ajustarStockSumar = async (req, res) => {
  const { idProducto, cantidadAjuste } = req.body;
  let errores = [];

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    errores.push('No se recibieron datos completos para el ajuste de stock');
  }

  if (!errores.length) {
    let erroresCampos = validateFields(req.body, ['idProducto', 'cantidadAjuste']);
    errores = [...errores, ...erroresCampos];
  }

  if (!errores.length && (typeof cantidadAjuste !== 'number' || cantidadAjuste == null)) {
    errores.push('La cantidad de ajuste debe ser un número válido');
  }

  if (errores.length) {
    res.status(400).json({error: true, message: 'Por favor revisa los campos requeridos: ' + errores.join(', ')});
  } else {
    try {
      const resultadoAjuste = await Producto.adjustStockSumar(idProducto, cantidadAjuste);
      handleResponse(res, null, resultadoAjuste);
    } catch (err) {
      handleResponse(res, err);
    }
  }
};
