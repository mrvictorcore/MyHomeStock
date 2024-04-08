'use strict';
const getConnection = require('./../../config/db.config');

var Usuario = function(usuario){

    this.id         = usuario.id;
    
    this.nombre     = usuario.nombre;
    this.apellido   = usuario.apellido;
    this.email      = usuario.email;
    this.password   = usuario.password;

    // this.created_at     = new Date();
    // this.updated_at     = new Date();
};

Usuario.existeUsuario  = function(email, result){
    var dbConn = getConnection();
    dbConn.query("SELECT * FROM usuario WHERE email = ?", email, function (err, res){
        dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Usuario.create = function (newEmp, result) {    
    var dbConn = getConnection();
    dbConn.query("INSERT INTO usuario set ?", newEmp, function (err, res) {
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
Usuario.findById = function (id, result) {
    var dbConn = getConnection();
    dbConn.query("Select * from usuario where id = ? ", id, function (err, res) {      
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
Usuario.findAll = function (result) {
    var dbConn = getConnection();
    dbConn.query("Select * from usuario", function (err, res) {
        dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('usuario : ', res);  
            result(null, res);
        }
    });   
};
Usuario.update = function(id, usuario, result){
    var dbConn = getConnection();
    dbConn.query("UPDATE usuario SET nombre=?,apellido=?,email=?,password=? WHERE id = ?", [usuario.nombre,usuario.apellido,usuario.email,usuario.password, id], function (err, res) {
        dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Usuario.delete = function(id, result){
    var dbConn = getConnection();
    dbConn.query("DELETE FROM usuario WHERE id = ?", [id], function (err, res) {
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

Usuario.login = function (user, result) {
    var dbConn = getConnection();
    dbConn.query("Select * from usuario where email = ? and password = ?", [user.email, user.password], function (err, res) {    
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

module.exports= Usuario;