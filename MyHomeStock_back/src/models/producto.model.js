'user strict';
const getConnection = require('../../config/db.config');

var Producto = function(producto){

    this.id                     = producto.id;
    this.created_at             = new Date();
    this.updated_at             = new Date();

    this.nombre_producto        = producto.nombre_producto;
    this.id_categoria           = producto.id_categoria;
    this.id_tipo                = producto.id_tipo;
    this.id_descripcion         = producto.id_descripcion;
    this.cantidad_stock         = producto.cantidad_stock;
    this.cantidad_min_mensual   = producto.cantidad_min_mensual;
    this.favorito               = producto.favorito;
    this.id_tipo                = producto.id_tipo;
    this.usuario_id             = producto.usuario_id;
    
};

Producto.create = function (newEmp, result) {    
    var dbConn = getConnection();
    dbConn.query("INSERT INTO producto set ?", newEmp, function (err, res) {
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
    dbConn.query("UPDATE producto SET descripcion=?,fecha_producto=?,cantidad=?,usuario_id=? WHERE id = ?", [producto.descripcion,producto.fecha_producto,producto.cantidad,producto.usuario_id, id], function (err, res) {
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

Producto.findByUsuarioId = function (req, result) {    
    var dbConn = getConnection();
    dbConn.query("Select * from producto where usuario_id = ? ", req.usuario_id, function (err, res) {
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

module.exports= Producto;