'use strict';
const getConnection = require('../../config/db.config');

var Categoria = function(categoria){

    this.id                 = categoria.id;
    this.created_at         = new Date();
    this.updated_at         = new Date();

    this.nombre_categoria   = categoria.nombre_categoria;
    this.usuario_id         = categoria.usuario_id;
};

Categoria.create = function (newEmp, result) {    
     var dbConn = getConnection();
    dbConn.query("INSERT INTO categoria set ?", newEmp, function (err, res) {
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
Categoria.findById = function (id, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from categoria where id = ? ", id, function (err, res) {             
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
Categoria.findAll = function (result) {
     var dbConn = getConnection();
    dbConn.query("Select * from categoria", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('categoria : ', res);  
            result(null, res);
        }
    });   
};
Categoria.update = function(id, categoria, result){
   var dbConn = getConnection();
    dbConn.query("UPDATE categoria SET nombre=?,usuario_id=? WHERE id = ?", [categoria.nombre,categoria.usuario_id, id], function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Categoria.delete = function(id, result){
     var dbConn = getConnection(); 
    dbConn.query("DELETE FROM categoria WHERE id = ?", [id], function (err, res) {
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

Categoria.findByUsuarioId = function (req, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from categoria where usuario_id = ? or usuario_id is null", req.usuario_id, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('categoria : ', res);
            result(null, res);
        }
    });
};

module.exports= Categoria;