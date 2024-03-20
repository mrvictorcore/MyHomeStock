'use strict';

const Descripcion = require('../models/descripcion.model');

exports.findAll = function(req, res) {
  Descripcion.findAll(function(err, descripcion) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', descripcion);
    res.send(descripcion);
  });
};


exports.create = function(req, res) {
    const new_descripcion = new Descripcion(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Descripcion.create(new_descripcion, function(err, descripcion) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Descripcion añadido correctamente!",data:descripcion});
        });
    }
};


exports.findById = function(req, res) {
    Descripcion.findById(req.params.id, function(err, descripcion) {
        if (err)
        res.send(err);
        res.json(descripcion);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Descripcion.update(req.params.id, new Descripcion(req.body), function(err, descripcion) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Descripcion actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  Descripcion.delete( req.params.id, function(err, descripcion) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Descripcion successfully deleted' });
  });
};

exports.findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new Descripcion(req.body);
    //handles null error
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Descripcion.findByUsuarioId(criteriosBusqueda, function(err, descripcions) {
            if (err)
            res.send(err);
            res.json(descripcions);
        });
    }
};