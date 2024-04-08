'use strict';

const Compra = require('../models/compra.model');

exports.findAll = function(req, res) {
  Compra.findAll(function(err, compra) {
    console.log('controller');
    if (err)
      res.status(500).json({ error: true, message: err.message });
    else
      res.status(200).json(compra);
  });
};

exports.create = function(req, res) {
  const new_compra = new Compra(req.body);

  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).json({ error: true, message: 'Por favor añada todos los campos requeridos' });
  } else {
      Compra.create(new_compra, function(err, compra) {
          if (err) {
              res.status(500).json({ error: true, message: err.message });
          } else {
              res.status(201).json({ error: false, message: "Compra añadida correctamente!", data: compra });
          }
      });
  }
};


exports.findById = function(req, res) {
    Compra.findById(req.params.id, function(err, compra) {
        if (err)
          res.status(500).json({ error: true, message: err.message });
        else
          res.status(200).json(compra);
    });
};

exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).json({ error: true, message: 'Por favor añada todos los campos requeridos' });
  } else {
      Compra.update(req.body.id, new Compra(req.body), function(err, compra) {
          if (err)
              res.status(500).json({ error: true, message: err.message });
          else
              res.status(200).json({ error: false, message: 'Compra actualizada correctamente' });
      });
  }  
};

exports.delete = function(req, res) {
    Compra.delete(req.params.id, function(err, compra) {
        if (err)
          res.status(500).json({ error: true, message: err.message });
        else
          res.status(200).json({ error: false, message: 'Compra eliminada correctamente' });
    });
};

exports.findByUsuarioId = function(req, res) {
    if (!req.body.usuario_id) {
        res.status(400).json({ error: true, message: 'Por favor proporcione el ID del usuario' });
    } else {
        Compra.findByUsuarioId(req.body.usuario_id, function(err, compras) {
            if (err)
              res.status(500).json({ error: true, message: err.message });
            else
              res.status(200).json(compras);
        });
    }
};

// exports.updateCantidadCompra = function(req, res) {
//     const idCompra = req.params.id;
//     const nuevaCantidad = req.body.nuevaCantidad;

//     Compra.updateCantidadComprar(idCompra, nuevaCantidad, function(err, compra) {
//         if (err) {
//             res.status(500).json({ error: true, message: err.message });
//         } else {
//             res.status(200).json({ error: false, message: "Cantidad actualizada correctamente" });
//         }
//     });
// };
