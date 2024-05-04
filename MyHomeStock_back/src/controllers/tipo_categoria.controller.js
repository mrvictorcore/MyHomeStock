import { TipoCategoria } from '../models/tipo_categoria.model.js';

export const findAll = function(req, res) {
  TipoCategoria.findAll(function(err, tipo_categoria) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', tipo_categoria);
    res.send(tipo_categoria);
  });
};


export const create = function(req, res) {
    const new_tipo_categoria = new TipoCategoria(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        TipoCategoria.create(new_tipo_categoria, function(err, tipo_categoria) {
            if (err)
            res.send(err);
            res.json({error:false,message:"TipoCategoria añadido correctamente!",data:tipo_categoria});
        });
    }
};


export const findById = function(req, res) {
    TipoCategoria.findById(req.params.id, function(err, tipo_categoria) {
        if (err)
        res.send(err);
        res.json(tipo_categoria);
    });
};


export const update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        TipoCategoria.update(req.params.id, new TipoCategoria(req.body), function(err, tipo_categoria) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'TipoCategoria actualizado correctamente' });
        });
    }
  
};


export const remove = function(req, res) {
  TipoCategoria.remove( req.params.id, function(err, tipo_categoria) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'TipoCategoria successfully deleted' });
  });
};

export const findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new TipoCategoria(req.body);
    //handles null error
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        TipoCategoria.findByUsuarioId(criteriosBusqueda, function(err, tipo_categorias) {
            if (err)
            res.send(err);
            res.json(tipo_categorias);
        });
    }
};