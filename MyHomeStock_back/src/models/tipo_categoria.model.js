import { getConnection } from '../../config/db.config.js';

export class TipoCategoria {
    constructor() {
        this.id             = tipo_categoria.id;
        this.id_usuario     = tipo_categoria.id_usuario;

        this.nombre         = tipo_categoria.nombre;
    }

    static async create (newEmp, result) {    
        var dbConn = getConnection();
        dbConn.query("INSERT INTO tipo_categoria set ?", newEmp, function (err, res) {
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
    }
    
    static async findById (id, result) {
        var dbConn = getConnection();
        dbConn.query("Select * from tipo_categoria where id = ? ", id, function (err, res) {             
        dbConn.end();
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
    }

    static async findAll (result) {
        var dbConn = getConnection();
        dbConn.query("Select * from tipo_categoria", function (err, res) {
        dbConn.end();
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('tipo_categoria : ', res);  
                result(null, res);
            }
        });   
    }

    static async update(id, tipo_categoria, result){
    var dbConn = getConnection();
        dbConn.query("UPDATE tipo_categoria SET descripcion=?,fecha_tipo_categoria=?,cantidad=?,usuario_id=? WHERE id = ?", [tipo_categoria.descripcion,tipo_categoria.fecha_tipo_categoria,tipo_categoria.cantidad,tipo_categoria.usuario_id, id], function (err, res) {
        dbConn.end();
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }else{   
                result(null, res);
            }
        }); 
    }

    static async delete(id, result){
        var dbConn = getConnection(); 
        dbConn.query("DELETE FROM tipo_categoria WHERE id = ?", [id], function (err, res) {
        dbConn.end();
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                result(null, res);
            }
        }); 
    }

    static async findByUsuarioId(req, result) {    
        var dbConn = getConnection();
        dbConn.query("Select * from tipo_categoria where usuario_id = ? ", req.usuario_id, function (err, res) {
        dbConn.end();
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('tipo_categoria : ', res);  
                result(null, res);
            }
        });           
    }
}
