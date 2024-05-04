import { getConnection } from './../../config/db.config.js';

export class Usuario {
    constructor() {
        this.id         = usuario.id;
        
        this.nombre     = usuario.nombre;
        this.apellido   = usuario.apellido;
        this.email      = usuario.email;
        this.password   = usuario.password;
    }

    static async existeUsuario (email, result){
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
    }

    static async create(newEmp, result) {    
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
    }

    static async findById(id, result) {
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
    }

    static async findAll(result) {
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
    }

    static async update(id, usuario, result){
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
    }

    static async remove(id, result){
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
    }

    static async login(user, result) {
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
    }
}