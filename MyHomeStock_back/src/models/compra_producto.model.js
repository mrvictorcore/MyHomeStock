'user strict';
const getConnection = require('../../config/db.config');

var CompraProducto = function(compra_producto){

    this.id                 = compra_producto.id;
    this.id_compra          = compra_producto.id_compra;
    this.id_producto        = compra_producto.id_producto;
    
    this.cantidad           = compra_producto.cantidad;

    // this.created_at         = new Date();
    // this.updated_at         = new Date();
};

CompraProducto.create = function (newEmp, result) {    
     var dbConn = getConnection();
    dbConn.query("INSERT INTO compra_producto set ?", newEmp, function (err, res) {
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

CompraProducto.findById = function (id, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from compra_producto where id = ? ", id, function (err, res) {             
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

CompraProducto.findAll = function (result) {
     var dbConn = getConnection();
    dbConn.query("SELECT cp.id, cp.id_compra, cp.id_producto, cp.cantidad, p.nombre AS nombre_producto FROM compra_producto cp JOIN producto p ON cp.id_producto = p.id", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('compra_producto : ', res);  
            result(null, res);
        }
    });   
};

CompraProducto.update = function(id, compra_producto, result) {
    var dbConn = getConnection();
    dbConn.query("UPDATE compra_producto SET id_compra=?, id_producto=?, cantidad=? WHERE id = ?",
                 [compra_producto.id_compra, compra_producto.id_producto, compra_producto.cantidad, id], 
    function (err, res) {
        dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

CompraProducto.delete = function(id, result){
     var dbConn = getConnection(); 
    dbConn.query("DELETE FROM compra_producto WHERE id = ?", [id], function (err, res) {
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

CompraProducto.findByUsuarioId = function (req, result) {    
     var dbConn = getConnection();
    dbConn.query("Select * from compra_producto where usuario_id = ? ", req.usuario_id, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('compra_producto : ', res);  
            result(null, res);
        }
    });           
};

CompraProducto.findByCompraId = function (idCompra, result) {
    var dbConn = getConnection();
    dbConn.query("SELECT * FROM compra_producto WHERE id_compra = ?", [idCompra], function (err, res) {
        dbConn.end();
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('compra_producto : ', res);
            result(null, res);
        }
    });
};


module.exports= CompraProducto;