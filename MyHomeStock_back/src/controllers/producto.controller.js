'use strict';

const Producto = require('../models/categoria-gasto.model');

exports.findAll = function(req, res) {
  Producto.findAll(function(err, producto) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', producto);
    res.send(producto);
  });
};


exports.create = function(req, res) {
    const new_producto = new Producto(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Producto.create(new_producto, function(err, producto) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Producto añadido correctamente!",data:producto});
        });
    }
};


exports.findById = function(req, res) {
    Producto.findById(req.params.id, function(err, producto) {
        if (err)
        res.send(err);
        res.json(producto);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Producto.update(req.params.id, new Producto(req.body), function(err, producto) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Producto actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  Producto.delete( req.params.id, function(err, producto) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Producto successfully deleted' });
  });
};

exports.findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new Producto(req.body);
    //handles null error
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Producto.findByUsuarioId(criteriosBusqueda, function(err, productos) {
            if (err)
            res.send(err);
            res.json(productos);
        });
    }
};