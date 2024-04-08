'user strict';
const getConnection = require('../../config/db.config');

var Producto = function(producto){

    this.id                     = producto.id;
    this.id_usuario             = producto.id_usuario;
    this.id_categoria           = producto.id_categoria;
    
    this.nombre                 = producto.nombre;
    this.descripcion            = producto.descripcion;
    this.cantidad_stock         = producto.cantidad_stock;
    this.cantidad_min_mensual   = producto.cantidad_min_mensual;
    this.favorito               = producto.favorito;
    
    // this.created_at             = new Date();
    // this.updated_at             = new Date();
};

Producto.create = function (newProducto, result) {    
    var dbConn = getConnection();
    dbConn.query("INSERT INTO producto set ?", newProducto, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

Producto.findById = function (id, result) {
    var dbConn = getConnection();
    dbConn.query("Select * from producto where id = ? ", id, function (err, res) {             
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Producto.findAll = function (result) {
    var dbConn = getConnection();
    dbConn.query("Select * from producto", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('producto : ', res);  
            result(null, res);
        }
    });   
};

Producto.update = function(id, producto, result){
    var dbConn = getConnection();
    dbConn.query("UPDATE producto SET nombre=?, descripcion=?, cantidad_stock=?, id_usuario=?, id_categoria=?, cantidad_min_mensual=?, favorito=? WHERE id = ?", 
    [producto.nombre, producto.descripcion, producto.cantidad_stock, producto.id_usuario, producto.id_categoria, producto.cantidad_min_mensual, producto.favorito, id], function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
  
Producto.delete = function(id, result){
    var dbConn = getConnection(); 
    dbConn.query("DELETE FROM producto WHERE id = ?", [id], function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

Producto.findByUsuarioId = function (id_usuario, result) {    
    var dbConn = getConnection();
    dbConn.query("Select * from producto where id_usuario = ? ", id_usuario, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('producto : ', res);  
            result(null, res);
        }
    });           
};

Producto.toggleFavorito = function(id, result) {
  var dbConn = getConnection();
  dbConn.query("SELECT favorito FROM producto WHERE id = ?", [id], function (err, res) {
    if (err) {
      result(null, err);
      dbConn.end();
    } else {
      let nuevoEstadoFavorito = !res[0].favorito;
      dbConn.query("UPDATE producto SET favorito = ? WHERE id = ?", [nuevoEstadoFavorito, id], function (err, res) {
        if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
        dbConn.end();
      });
    }
  });
};

Producto.adjustStock = function(ID_producto, cantidadAjuste, result) {
  var dbConn = getConnection();
  dbConn.query("SELECT cantidad_stock FROM producto WHERE id = ?", [ID_producto], function(err, res) {
      if (err) {
          dbConn.end();
          result(err, null);
          return;
      }

      if (res.length) {
          let nuevoStock = res[0].cantidad_stock + cantidadAjuste;

          if (nuevoStock < 0) {
              dbConn.end();
              result({ message: "Stock insuficiente" }, null);
              return;
          }

          dbConn.query("UPDATE producto SET cantidad_stock = ? WHERE id = ?", [nuevoStock, ID_producto], function(err) {
              dbConn.end();
              if (err) {
                  result(err, null);
              } else {
                  result(null, { id: ID_producto, cantidad_stock: nuevoStock });
              }
          });
      } else {
          dbConn.end();
          result({ message: "Producto no encontrado" }, null);
      }
  });
};


module.exports = Producto;