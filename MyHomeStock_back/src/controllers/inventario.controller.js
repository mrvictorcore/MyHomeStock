'use strict';

const Inventario = require('../models/inventario.model');

exports.findAll = function(req, res) {
  Inventario.findAll(function(err, inventario) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', inventario);
    res.send(inventario);
  });
};


exports.create = function(req, res) {
    const new_inventario = new Inventario(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Inventario.create(new_inventario, function(err, inventario) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Inventario añadido correctamente!",data:inventario});
        });
    }
};


exports.findById = function(req, res) {
    Inventario.findById(req.params.id, function(err, inventario) {
        if (err)
        res.send(err);
        res.json(inventario);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Inventario.update(req.params.id, new Inventario(req.body), function(err, inventario) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Inventario actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  Inventario.delete( req.params.id, function(err, inventario) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Inventario successfully deleted' });
  });
};

exports.findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new Inventario(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Inventario.findByUsuarioId(criteriosBusqueda, function(err, inventarios) {
            if (err)
            res.send(err);
            res.json(inventarios);
        });
    }
};
