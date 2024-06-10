import { getConnection } from './../../config/db.config.js';
import bcrypt from 'bcryptjs';

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
        newEmp.password = bcrypt.hashSync(newEmp.password, 8);

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
        
        if (usuario.password) {
            usuario.password = bcrypt.hashSync(usuario.password, 8);
        }

        const query = `
            UPDATE usuario
            SET nombre = ?, apellido = ?, email = ?, password = ?
            WHERE id = ?
        `;

        try {
            const [res] = await dbConn.query(query, [usuario.nombre, usuario.apellido, usuario.email, usuario.password, id]);
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

    static async login(email, password) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM usuario WHERE email = ?", [email]);
            
            if (res.length > 0) {
                const user = res[0];
                const passwordIsValid = bcrypt.compareSync(password, user.password);

                if (!passwordIsValid) {
                    throw new Error('Contraseña invalida');
                }

                return user;
            } else {
                throw new Error('Usuario no encontrado');
            }
        } catch (err) {
            throw err;
        }
    }
}