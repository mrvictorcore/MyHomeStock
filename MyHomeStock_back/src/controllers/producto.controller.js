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
  const idProducto =req.params.id;

  const idError = validateId(idProducto);
  if (idError) {
    return res.status(400).json({ error: true, message: idError });
  }

  try {
    const data_producto = await Producto.toggleFavorito(idProducto);
    handleResponse(res, null, data_producto);
  } catch (err) {
    handleResponse(err);
  }
};

export const ajustarStock = async (req, res) => {
  const { idProducto, cantidadAjuste } = req.body;
  let errores = [];

  // Verificar que se haya recibido un objeto con datos para el ajuste de stock
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    errores.push('No se recibieron datos completos para el ajuste de stock');
  }

  // Validar los campos necesarios para la operación
  if (!errores.length) {
    let erroresCampos = validateFields(req.body, ['idProducto', 'cantidadAjuste']);
    errores = [...errores, ...erroresCampos];
  }

  // Validar que cantidadAjuste sea un número y no nulo
  if (!errores.length && (typeof cantidadAjuste !== 'number' || cantidadAjuste == null)) {
    errores.push('La cantidad de ajuste debe ser un número válido');
  }

  // Manejar los errores acumulados o proceder con el ajuste de stock
  if (errores.length) {
    res.status(400).json({error: true, message: 'Por favor revisa los campos requeridos: ' + errores.join(', ')});
  } else {
    try {
      const resultadoAjuste = await Producto.adjustStock(idProducto, cantidadAjuste);
      handleResponse(res, null, resultadoAjuste);
    } catch (err) {
      handleResponse(res, err);
    }
  }
};
