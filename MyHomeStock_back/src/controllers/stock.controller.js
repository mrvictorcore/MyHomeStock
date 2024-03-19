'use strict';

const Stock = require('../models/stock.model');

exports.findAll = function(req, res) {
  Stock.findAll(function(err, stock) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', stock);
    res.send(stock);
  });
};


exports.create = function(req, res) {
    const new_stock = new Stock(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Stock.create(new_stock, function(err, stock) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Stock añadido correctamente!",data:stock});
        });
    }
};


exports.findById = function(req, res) {
    Stock.findById(req.params.id, function(err, stock) {
        if (err)
        res.send(err);
        res.json(stock);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Stock.update(req.params.id, new Stock(req.body), function(err, stock) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Stock actualizado correctamente' });
        });
    }
  
};


exports.delete = function(req, res) {
  Stock.delete( req.params.id, function(err, stock) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Stock successfully deleted' });
  });
};

exports.findByUsuarioId = function(req, res) {
    const criteriosBusqueda = new Stock(req.body);
    //handles null error
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor añada todos los campos requeridos' });
    }else{
        Stock.findByUsuarioId(criteriosBusqueda, function(err, stocks) {
            if (err)
            res.send(err);
            res.json(stocks);
        });
    }
};