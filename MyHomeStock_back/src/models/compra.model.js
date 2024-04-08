'use strict';
const getConnection = require('../../config/db.config');

var Compra = function(compra){

    this.id             = compra.id;
    this.id_usuario     = compra.id_usuario;
    
    this.descripcion    = compra.descripcion;

    // this.created_at     = new Date();
    // this.updated_at     = new Date();
};

Compra.create = function (newCompra, result) {    
    var dbConn = getConnection();
    dbConn.query("INSERT INTO compra set ?", newCompra, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            const insertedId = res.insertId;
            dbConn.query("SELECT * FROM compra WHERE id = ?", insertedId, function(err, res) {
                dbConn.end();
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res[0]);
                }
            });
        }
    });           
};


Compra.findById = function (id, result) {
     var dbConn = getConnection();
    dbConn.query("Select * from compra where id = ? ", id, function (err, res) {             
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

Compra.findAll = function (result) {
     var dbConn = getConnection();
    dbConn.query("Select * from compra", function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('compra : ', res);  
            result(null, res);
        }
    });   
};

Compra.update = function(id, compra, result){
    var dbConn = getConnection();
     dbConn.query(
         "UPDATE compra SET descripcion=? WHERE id = ?", 
         [compra.descripcion, id], 
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
 

Compra.delete = function(id, result){
     var dbConn = getConnection(); 
    dbConn.query("DELETE FROM compra WHERE id = ?", [id], function (err, res) {
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

Compra.findByUsuarioId = function (req, result) {    
     var dbConn = getConnection();
    dbConn.query("Select * from compra where usuario_id = ? ", req.usuario_id, function (err, res) {
    dbConn.end();
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('compra : ', res);  
            result(null, res);
        }
    });           
};

// Compra.updateCantidadComprar = function(idCompra, nuevaCantidad, result) {
//     var dbConn = getConnection();
//     dbConn.query("UPDATE compra SET cantidad_comprar = ? WHERE id = ?", [nuevaCantidad, idCompra], function(err, res) {
//         dbConn.end();
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     });
// };



module.exports= Compra;