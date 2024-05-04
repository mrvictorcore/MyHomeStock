import { getConnection } from '../../config/db.config.js';
import { handleDbResponse } from '../../config/helpers/dbUtils.js';

/**
 * Clase Compra representa una compra en la base de datos.
*/
export class Compra {
    constructor(compra) {
        this.id             = compra.id;
        this.id_usuario     = compra.id_usuario;
        this.descripcion    = compra.descripcion;
    }
    
    /**
     * Recupera todas las compras de la base de datos.
    */
    static async findAll(result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM compra");
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Inserta una nueva compra en la base de datos y devuelve el objeto insertado.
    */
    static async create(newCompra, result) {
        const dbConn = getConnection();
        
        try {
            const [res] = await dbConn.query("INSERT INTO compra SET ?", newCompra);
            const insertedId = res.insertId;
            const [compraDetails] = await dbConn.query("SELECT * FROM compra WHERE id = ?", [insertedId]);
            handleDbResponse(null, compraDetails, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Busca una compra por ID.
    */
    static async findById(id, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM compra WHERE id = ?", id);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Actualiza la descripción de una compra por su ID.
    */
    static async update(id, compra, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("UPDATE compra SET descripcion = ? WHERE id = ?", [compra.descripcion, id]);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Elimina una compra por ID.
    */
    static async remove(id, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("DELETE FROM compra WHERE id = ?", id);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Busca compras por el ID del usuario.
    */
    static async findByUsuarioId(usuario_id, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM compra WHERE usuario_id = ?", usuario_id);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Busca compras por descripción.
    */
    static async findByDescripcion(descripcion, result) {
        const dbConn = getConnection();
        
        try {
            const [res] = await dbConn.query("SELECT * FROM compra WHERE descripcion = ?", descripcion);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }
}