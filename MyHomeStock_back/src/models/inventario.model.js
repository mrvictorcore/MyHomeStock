'user strict';
const getConnection = require('../../config/db.config');

var Inventario = function(inventario){

    this.id         = inventario.id;
    this.created_at = new Date();
    this.updated_at = new Date();

    this.nombre     = inventario.nombre;
    this.usuario_id = inventario.usuario_id;
};

Inventario.create = function (newEmp, result) {    
     var dbConn = getConnection();
    dbConn.query("INSERT INTO inventario set ?", newEmp, function (err, res) {
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
Inventario.findById = function (id, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from inventario where id = ? ", id, function (err, res) {             
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
Inventario.findAll = function (result) {
     var dbConn = getConnection();
    dbConn.query("Select * from inventario", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('inventario : ', res);  
            result(null, res);
        }
    });   
};
Inventario.update = function(id, inventario, result){
   var dbConn = getConnection();
    dbConn.query("UPDATE inventario SET nombre=?,usuario_id=? WHERE id = ?", [inventario.nombre,inventario.usuario_id, id], function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Inventario.delete = function(id, result){
     var dbConn = getConnection(); 
    dbConn.query("DELETE FROM inventario WHERE id = ?", [id], function (err, res) {
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

Inventario.findByUsuarioId = function (req, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from inventario where usuario_id = ? or usuario_id is null", req.usuario_id, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('inventario : ', res);
            result(null, res);
        }
    });
};

module.exports= Inventario;