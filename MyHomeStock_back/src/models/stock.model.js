'user strict';
const getConnection = require('../../config/db.config');

var Stock = function(stock){

    this.id            = stock.id;
    this.created_at = new Date();
    this.updated_at = new Date();
    
    this.descripcion   = stock.descripcion;
    this.cantidad      = stock.cantidad;
    this.fecha_stock = stock.fecha_stock;
    this.categoria_id    = stock.categoria_id;
    this.tipo_stock    = stock.tipo_stock;
    this.usuario_id    = stock.usuario_id;
};

Stock.create = function (newEmp, result) {    
     var dbConn = getConnection();
    dbConn.query("INSERT INTO stocks set ?", newEmp, function (err, res) {
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
Stock.findById = function (id, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from stocks where id = ? ", id, function (err, res) {             
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
Stock.findAll = function (result) {
     var dbConn = getConnection();
    dbConn.query("Select * from stocks", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('stocks : ', res);  
            result(null, res);
        }
    });   
};
Stock.update = function(id, stock, result){
   var dbConn = getConnection();
    dbConn.query(
        "UPDATE stocks SET descripcion=?,cantidad=?,fecha_stock=?,categoria_id=?,tipo_stock=?,usuario_id=? WHERE id = ?", 
        [stock.descripcion,stock.cantidad,stock.fecha_stock,stock.categoria_id,stock.tipo_stock,stock.usuario_id, id], 
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
Stock.delete = function(id, result){
     var dbConn = getConnection(); 
    dbConn.query("DELETE FROM stocks WHERE id = ?", [id], function (err, res) {
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

Stock.findByUsuarioId = function (req, result) {    
     var dbConn = getConnection();
    dbConn.query("Select * from stocks where usuario_id = ? ", req.usuario_id, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('stocks : ', res);  
            result(null, res);
        }
    });           
};


module.exports= Stock;