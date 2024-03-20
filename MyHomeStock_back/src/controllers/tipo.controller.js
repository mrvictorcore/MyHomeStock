'use strict';

const Tipo = require('../models/tipo.model');

exports.findAll = function(req, res) {
  Tipo.findAll(function(err, tipo) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', tipo);
    res.send(tipo);
  });
};


exports.create = function(req, res) {
    const new_tipo = new Tipo(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Tipo.create(new_tipo, function(err, tipo) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Tipo añadido correctamente!",data:tipo});
        });
    }
};


exports.findById = function(req, res) {
    Tipo.findById(req.params.id, function(err, tipo) {
        if (err)
        res.send(err);
        res.json(tipo);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Tipo.update(req.params.id, new Tipo(req.body), function(err, tipo) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Tipo actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  Tipo.delete( req.params.id, function(err, tipo) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Tipo successfully deleted' });
  });
};

exports.findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new Tipo(req.body);
    //handles null error
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Tipo.findByUsuarioId(criteriosBusqueda, function(err, tipos) {
            if (err)
            res.send(err);
            res.json(tipos);
        });
    }
};