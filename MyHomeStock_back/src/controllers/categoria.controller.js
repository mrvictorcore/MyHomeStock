'use strict';

import { Categoria } from '../models/categoria.model.js';

export const findAll = function(req, res) {
  Categoria.findAll(function(err, categoria) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', categoria);
    res.send(categoria);
  });
};


export const create = function(req, res) {
    const new_categoria = new Categoria(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Categoria.create(new_categoria, function(err, categoria) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Categoria añadido correctamente!",data:categoria});
        });
    }
};


export const findById = function(req, res) {
    Categoria.findById(req.params.id, function(err, categoria) {
        if (err)
        res.send(err);
        res.json(categoria);
    });
};


export const update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Categoria.update(req.params.id, new Categoria(req.body), function(err, categoria) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Categoria actualizado correctamente' });
        });
    }
  
};


export const remove = function(req, res) {
  Categoria.remove( req.params.id, function(err, categoria) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Categoria successfully deleted' });
  });
};

export const findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new Categoria(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Categoria.findByUsuarioId(criteriosBusqueda, function(err, categorias) {
            if (err)
            res.send(err);
            res.json(categorias);
        });
    }
};
