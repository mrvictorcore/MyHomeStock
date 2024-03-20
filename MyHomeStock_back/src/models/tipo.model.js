'user strict';
const getConnection = require('../../config/db.config');

var Tipo = function(tipo){

    this.id             = tipo.id;
    this.created_at     = new Date();
    this.updated_at     = new Date();

    this.nombre_tipo    = tipo.nombre_tipo;
    this.usuario_id     = tipo.usuario_id;
    
};

Tipo.create = function (newEmp, result) {    
    var dbConn = getConnection();
    dbConn.query("INSERT INTO tipo set ?", newEmp, function (err, res) {
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
Tipo.findById = function (id, result) {
    var dbConn = getConnection();
    dbConn.query("Select * from tipo where id = ? ", id, function (err, res) {             
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
Tipo.findAll = function (result) {
    var dbConn = getConnection();
    dbConn.query("Select * from tipo", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tipo : ', res);  
            result(null, res);
        }
    });   
};
Tipo.update = function(id, tipo, result){
  var dbConn = getConnection();
    dbConn.query("UPDATE tipo SET descripcion=?,fecha_tipo=?,cantidad=?,usuario_id=? WHERE id = ?", [tipo.descripcion,tipo.fecha_tipo,tipo.cantidad,tipo.usuario_id, id], function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Tipo.delete = function(id, result){
    var dbConn = getConnection(); 
    dbConn.query("DELETE FROM tipo WHERE id = ?", [id], function (err, res) {
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

Tipo.findByUsuarioId = function (req, result) {    
    var dbConn = getConnection();
    dbConn.query("Select * from tipo where usuario_id = ? ", req.usuario_id, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tipo : ', res);  
            result(null, res);
        }
    });           
};

module.exports= Tipo;