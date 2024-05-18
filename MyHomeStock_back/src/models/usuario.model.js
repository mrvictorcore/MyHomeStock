import { getConnection } from './../../config/db.config.js';

export class Usuario {
    constructor(usuario) {
        this.id         = usuario.id;
        
        this.nombre     = usuario.nombre;
        this.apellido   = usuario.apellido;
        this.email      = usuario.email;
        this.password   = usuario.password;
    }

    static async existeUsuario (email) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM usuario WHERE email = ?", email);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async create(newEmp) {    
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("INSERT INTO usuario SET ?", newEmp);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async findById(id) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM usuario WHERE id = ?", id);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async findAll() {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM usuario");
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, usuario){
        const dbConn = getConnection();
        const query = `
            UPDATE usuario
            SET nombre = ?, apellido = ?, email = ?, password = ?
            WHERE id = ?
        `;

        try {
            const [res] = await dbConn.query(query, [usuario.nombre,usuario.apellido,usuario.email,usuario.password, id]);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async remove(id){
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("DELETE FROM usuario WHERE id = ?", [id]);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async login(user) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM usuario WHERE email = ? AND password = ?", [user.email, user.password]);
            return res;
        } catch (err) {
            throw err;
        }
    }
}