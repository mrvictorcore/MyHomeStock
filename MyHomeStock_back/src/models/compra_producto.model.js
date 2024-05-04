import { getConnection } from '../../config/db.config.js';
import { handleDbResponse } from '../../config/helpers/dbUtils.js';

/**
 * Clase compraProducto representa un compraProducto en la base de datos.
*/
export class CompraProducto { 
    constructor(compra_producto){
        this.id_compra      = compra_producto.id_compra;
        this.id_producto    = compra_producto.id_producto;
        this.cantidad       = compra_producto.cantidad;
    }

    /**
     * Inserta un nuevo compraProducto en la base de datos y devuelve el objeto insertado.
    */
    static async create(newCompraProducto, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("INSERT INTO compra_producto set ?", newCompraProducto);
            handleDbResponse(null, result);
        } catch (err) {
            handleDbResponse(err, null);
        }
    }

    /**
     * Busca un compraProducto por su id_compra e id_producto.
    */
    static async findById(idCompra, idProducto, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM compra_producto WHERE id_compra = ? AND id_producto = ?", [idCompra, idProducto]);
            handleDbResponse(null, res);
        } catch (err) {
            handleDbResponse(err, null);
        }
    }

    /**
     * Recupera todos los compraProductos de la base de datos.
    */
    static async findAll(result) {
        const dbConn = getConnection();
        const query = `
            SELECT cp.id_compra, cp.id_producto, cp.cantidad, p.nombre 
            AS nombre_producto, p.cantidad_stock 
            AS stock_producto 
            FROM compra_producto cp 
            JOIN producto p 
            ON cp.id_producto = p.id
        `;

        try {
            const [res] = await dbConn.query(query);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Actualiza la cantidad de una compraProductos por su id_compra e id_producto.
    */
    static async update(idCompra, idProducto, newCantidad, result) {
        const dbConn = getConnection();

        if (newCantidad > 0) {
            try {
                    const [res] = await dbConn.query("UPDATE compra_producto SET cantidad = ? WHERE id_compra = ? AND id_producto = ?", [newCantidad, idCompra, idProducto]);
                    handleDbResponse(null, res, result);
                } catch (err) {
                    handleDbResponse(err, null, result);
                }
        } else {
            console.log('La cantidad no puede ser menor, igual a cero: ', newCantidad);
        }
    }

    /**
     * Elimina una compraProductos por su id_compra e id_producto.
    */
    static async remove(idCompra, idProducto, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("DELETE FROM compra_producto WHERE id_compra = ? AND id_producto = ?", [idCompra, idProducto]);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Busca compraProductos por el ID del usuario.
    */
    static async findByUsuarioId(usuario_id, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("Select * from compra_producto where usuario_id = ? ", usuario_id);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Busca compraProductos por su id de compra.
    */
    static async findByCompraId(idCompra, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM compra_producto WHERE id_compra = ?", [idCompra]);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    /**
     * Busca todo de Productos asociados a una compra y le añade el atributo cantidad de CompraProducto.
    */
    static async getProductosDeCompraByCompraId(idCompra, result) {
        const dbConn = getConnection();
        const query = `
            SELECT p.*, cp.cantidad
            FROM compra_producto AS cp
            JOIN producto AS p ON cp.id_producto = p.id
            WHERE cp.id_compra = ?
        `;

        try {
            const [res] = await dbConn.query(query, [idCompra]);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }
}