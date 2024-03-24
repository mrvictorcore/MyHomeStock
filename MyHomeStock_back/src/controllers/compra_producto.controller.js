'use strict';

const CompraProducto = require('../models/compra_producto.model');

exports.findAll = function(req, res) {
  CompraProducto.findAll(function(err, compra_producto) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', compra_producto);
    res.send(compra_producto);
  });
};


exports.create = function(req, res) {
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


exports.findById = function(req, res) {
    CompraProducto.findById(req.params.id, function(err, compra_producto) {
        if (err)
        res.send(err);
        res.json(compra_producto);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        CompraProducto.update(req.params.id, new CompraProducto(req.body), function(err, compra_producto) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'compra_producto actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  CompraProducto.delete( req.params.id, function(err, compra_producto) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'compra_producto successfully deleted' });
  });
};

exports.findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new CompraProducto(req.body);
    //handles null error
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