'use strict';
import { getConnection } from '../../config/db.config.js';

export class Categoria{
    constructor(categoria){
        this.id                 = categoria.id;
        this.id_tipo            = categoria.id_tipo;
        this.id_usuario         = categoria.id_usuario;

        this.nombre             = categoria.nombre;
    }
    
    static async create(newEmp, result) {    
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
    static async findById(id, result) {
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
    static async findAll(result) {
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
    static async update(id, categoria, result){
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
    static async remove(id, result){
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

    static async findByUsuarioId(req, result) {
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
}