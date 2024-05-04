import { CompraProducto } from '../models/compra_producto.model.js';
import { isFunction, handleResponse } from '../../config/helpers/dbUtils.js';

export const findAll = async (req, res) => {
    
  CompraProducto.findAll(function(err, compra_producto) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', compra_producto);
    res.send(compra_producto);
  });
};


export const create = function(req, res) {
    const new_descripcion = new CompraProducto(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        CompraProducto.create(new_descripcion, function(err, compra_producto) {
            if (err)
            res.send(err);
            res.json({error:false,message:"CompraProducto añadido correctamente!",data:compra_producto});
        });
    }
};


export const findById = function(req, res) {
    CompraProducto.findById(req.params.idCompra, req.params.idProducto, function(err, compra_producto) {
        if (err) {
            res.send(err);
        } else {
            res.json(compra_producto);
        }
    });
};


export const update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        let idCompra = req.body.id_compra;
        let idProducto = req.body.id_producto;
        CompraProducto.update(idCompra, idProducto, req.body, function(err, compra_producto) {
            if (err){
                res.send(err);
            } else {
                res.json({ error:false, message: 'compra_producto actualizado correctamente', compra_producto});
            }
        });
    }
  
};

export const remove = function(req, res) {
    let idCompra = req.params.idCompra;
    let idProducto = req.params.idProducto;

    CompraProducto.remove( idCompra, idProducto, function(err, compra_producto) {
        if (err) {
            res.send(err);
        } else {
            res.json({ error:false, message: 'compra_producto successfully deleted', compra_producto });
        }
    });
};

export const findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new CompraProducto(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        CompraProducto.findByUsuarioId(criteriosBusqueda, function(err, descripcions) {
            if (err)
            res.send(err);
            res.json(descripcions);
        });
    }
};

export const findByCompraId = function(req, res) {
    CompraProducto.findByCompraId(req.params.id, function(err, compra_producto) {
        if (err) {
            res.send(err);
        }
        res.json(compra_producto);
    });
};

export const getProductosDeCompra = (req, res) => {
    const idCompra = req.params.id;
    CompraProducto.getProductosDeCompraByCompraId(idCompra, (err, productos) => {
        if (err) {
            return res.status(500).send({ succes: false, message: "Ocurrió un error al obtener los productos de la compra" });
        }
        console.log(productos);
        res.json(productos);
    });
};