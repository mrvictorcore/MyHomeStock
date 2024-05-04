import { Producto } from '../models/producto.model.js';

export const findAll = function(req, res) {
  Producto.findAll(function(err, producto) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', producto);
    res.send(producto);
  });
};


export const create = function(req, res) {
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


export const findById = function(req, res) {
  Producto.findById(req.params.id, function(err, producto) {
      if (err)
      res.send(err);
      res.json(producto);
  });
};


export const update = function(req, res) {
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


export const remove = function(req, res) {
  Producto.remove( req.params.id, function(err, producto) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Producto successfully deleted' });
  });
};

export const findByUsuarioId = function(req, res) {
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

export const toggleFavorito = function(req, res) {
  Producto.toggleFavorito(req.params.id, function(err, producto) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json({ message: "Estado de favorito actualizado correctamente" });
    }
  });
};

export const ajustarStock = function(req, res) {
    const idProducto = req.params.id;
    const { cantidadAjuste } = req.body;

    Producto.adjustStock(idProducto, cantidadAjuste, function(err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json({ message: "Stock ajustado correctamente", data: result });
        }
    });
};
