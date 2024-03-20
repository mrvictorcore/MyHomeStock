'user strict';
const getConnection = require('../../config/db.config');

var Descripcion = function(descripcion){

    this.id                 = descripcion.id;
    this.created_at         = new Date();
    this.updated_at         = new Date();
    
    this.descripcion        = descripcion.descripcion;
    this.cantidad           = descripcion.cantidad;
    this.fecha_descripcion  = descripcion.fecha_descripcion;
    this.categoria_id       = descripcion.categoria_id;
    this.tipo_descripcion   = descripcion.tipo_descripcion;
    this.usuario_id         = descripcion.usuario_id;
};

Descripcion.create = function (newEmp, result) {    
     var dbConn = getConnection();
    dbConn.query("INSERT INTO descripcion set ?", newEmp, function (err, res) {
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
Descripcion.findById = function (id, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from descripcion where id = ? ", id, function (err, res) {             
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
Descripcion.findAll = function (result) {
     var dbConn = getConnection();
    dbConn.query("Select * from descripcion", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('descripcion : ', res);  
            result(null, res);
        }
    });   
};
Descripcion.update = function(id, descripcion, result){
   var dbConn = getConnection();
    dbConn.query(
        "UPDATE descripcion SET descripcion=?,cantidad=?,fecha_descripcion=?,categoria_id=?,tipo_descripcion=?,usuario_id=? WHERE id = ?", 
        [descripcion.descripcion,descripcion.cantidad,descripcion.fecha_descripcion,descripcion.categoria_id,descripcion.tipo_descripcion,descripcion.usuario_id, id], 
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
Descripcion.delete = function(id, result){
     var dbConn = getConnection(); 
    dbConn.query("DELETE FROM descripcion WHERE id = ?", [id], function (err, res) {
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

Descripcion.findByUsuarioId = function (req, result) {    
     var dbConn = getConnection();
    dbConn.query("Select * from descripcion where usuario_id = ? ", req.usuario_id, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('descripcion : ', res);  
            result(null, res);
        }
    });           
};


module.exports= Descripcion;