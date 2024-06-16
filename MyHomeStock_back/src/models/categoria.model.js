import { getConnection } from '../../config/db.config.js';

export class Categoria {
    constructor(categoria) {
        this.id                 = categoria.id;
        this.id_tipo            = categoria.id_tipo;
        this.id_usuario         = categoria.id_usuario;
        this.nombre             = categoria.nombre;
    }
    
    static async findAll() {
        const dbConn = getConnection();

        try {
            const[res] = await dbConn.query("SELECT * FROM categoria");
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async create(newCategoria) {    
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("INSERT INTO categoria SET ?", newCategoria);
            return { affectedRows: res.affectedRows, insertId: res.insertId };
        } catch (err) {
            throw err;
        }
    }

    static async findById(idCategoria) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM categoria WHERE id = ?", [idCategoria]);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, categoria) {
        const dbConn = getConnection();
        const query = `
            UPDATE categoria 
            SET nombre = ?, 
                id_usuario = ? 
            WHERE id = ?
        `;

        try {
            const [res] = await dbConn.query(query, [categoria.nombre, categoria.id_usuario, id]);
            return { affectedRows: res.affectedRows };
        } catch (err) {
            throw err;
        } 
    }

    static async remove(idCategoria) {
        const dbConn = getConnection(); 

        try {
            const [res] = await dbConn.query("DELETE FROM categoria WHERE id = ?", [idCategoria]);
            return { affectedRows: res.affectedRows };
        } catch (err) {
            throw err;
        }
    }

    static async findByUsuarioId(idUser) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM categoria WHERE id_usuario = ? or id_usuario is null", idUser);
            return res;
        } catch (err) {
            throw err;
        }
    }
}