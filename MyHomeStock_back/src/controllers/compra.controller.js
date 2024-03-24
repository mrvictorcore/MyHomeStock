'use strict';

const Compra = require('../models/compra.model');

exports.findAll = function(req, res) {
  Compra.findAll(function(err, compra) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', compra);
    res.send(compra);
  });
};


exports.create = function(req, res) {
    const new_compra = new Compra(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Compra.create(new_compra, function(err, compra) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Compra añadido correctamente!",data:compra});
        });
    }
};


exports.findById = function(req, res) {
    Compra.findById(req.params.id, function(err, compra) {
        if (err)
        res.send(err);
        res.json(compra);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Compra.update(req.params.id, new Compra(req.body), function(err, compra) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Compra actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  Compra.delete( req.params.id, function(err, compra) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Compra successfully deleted' });
  });
};

exports.findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new Compra(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Compra.findByUsuarioId(criteriosBusqueda, function(err, compras) {
            if (err)
            res.send(err);
            res.json(compras);
        });
    }
};

exports.updateCantidadCompra = function(req, res) {
    let idCompra = req.params.id;
    let nuevaCantidad = req.body.nuevaCantidad;

    Compra.updateCantidadComprar(idCompra, nuevaCantidad, function(err, compra) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ message: "Cantidad actualizada correctamente" });
        }
    });
};
