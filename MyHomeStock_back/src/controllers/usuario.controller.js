'use strict';

const Usuario = require('../models/usuario.model');

exports.findAll = function(req, res) {
  Usuario.findAll(function(err, usuario) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', usuario);
    res.send(usuario);
  });
};

exports.existeUsuario = function(req, res){
    const new_email = req.query.email;

    Usuario.existeUsuario(new_email, function(err, usuario){
        if(err){
            res.send(err);
        } else {
            res.json(usuario);
        }
    });
};

exports.create = function(req, res) {
    const new_usuario = new Usuario(req.body);

   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Usuario.create(new_usuario, function(err, usuario) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Usuario añadido correctamente!",data:usuario});
        });
    }
};


exports.findById = function(req, res) {
    Usuario.findById(req.params.id, function(err, usuario) {
        if (err)
        res.send(err);
        res.json(usuario);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Usuario.update(req.params.id, new Usuario(req.body), function(err, usuario) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Usuario actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  Usuario.delete( req.params.id, function(err, usuario) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Usuario successfully deleted' });
  });
};


exports.login = function(req, res) {
    const usuario = new Usuario(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Usuario.login(usuario, function(err, usuario) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Ok",data:usuario});
        });
    }
};