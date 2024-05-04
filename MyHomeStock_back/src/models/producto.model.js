import { getConnection } from '../../config/db.config.js';
import { handleDbResponse } from '../../config/helpers/dbUtils.js';

export class Producto {
    constructor() {
        this.id                     = producto.id;
        this.id_usuario             = producto.id_usuario;
        this.id_categoria           = producto.id_categoria;
        
        this.nombre                 = producto.nombre;
        this.descripcion            = producto.descripcion;
        this.cantidad_stock         = producto.cantidad_stock;
        this.cantidad_min_mensual   = producto.cantidad_min_mensual;
        this.favorito               = producto.favorito;
    }

    static async create(newProducto, result) {    
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("INSERT INTO producto SET ?", newProducto);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    static async findById(idProducto, result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM producto WHERE id = ?", [idProducto]);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    static async findAll(result) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM producto");
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    static async update(id, producto, result){
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("UPDATE producto SET nombre=?, descripcion=?, cantidad_stock=?, id_usuario=?, id_categoria=?, cantidad_min_mensual=?, favorito=? WHERE id = ?", 
            [producto.nombre, producto.descripcion, producto.cantidad_stock, producto.id_usuario, producto.id_categoria, producto.cantidad_min_mensual, producto.favorito, id]);
            handleDbResponse(null, res, result)
        } catch (err) {
            handleDbResponse(err, null, result);
        } 
    }
    
    static async remove(idProducto, result){
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("DELETE FROM producto WHERE id = ?", [idProducto]);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    static async findByUsuarioId(id_user, result) {    
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM producto WHERE id_usuario = ?", id_user);
            handleDbResponse(null, res, result);
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    static async toggleFavorito(idProducto, result) {
        const dbConn = getConnection();

        try {
            const [resFavorito] = await dbConn.query("SELECT favorito FROM producto WHERE id = ?", [idProducto]);
            handleDbResponse(null, resFavorito, result);
            let productoFavorito = resFavorito[0].favorito;
            let nuevoEstadoFavorito = !productoFavorito;

            try {
                const [res] = await dbConn.query("UPDATE producto SET favorito = ? WHERE id = ?", [nuevoEstadoFavorito]);
                handleDbResponse(null, res, result);
            } catch (err) {
                handleDbResponse(err, null, result);
            }
        } catch (err) {
            handleDbResponse(err, null, result);
        }
    }

    static async updateStock(id, cantidad, result) {
        var dbConn = getConnection();
        dbConn.query("UPDATE producto SET cantidad_stock = cantidad_stock + ? WHERE id = ?", [cantidad, id], function(err, res) {
            dbConn.end();
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static async adjustStock(ID_producto, cantidadAjuste, result) {
        var dbConn = getConnection();
        dbConn.query("SELECT cantidad_stock FROM producto WHERE id = ?", [ID_producto], function(err, res) {
            if (err) {
                dbConn.end();
                result(err, null);
                return;
            }

            if (res.length) {
                let nuevoStock = res[0].cantidad_stock + cantidadAjuste;

                if (nuevoStock < 0) {
                    dbConn.end();
                    result({ message: "Stock insuficiente" }, null);
                    return;
                }

                dbConn.query("UPDATE producto SET cantidad_stock = ? WHERE id = ?", [nuevoStock, ID_producto], function(err) {
                    dbConn.end();
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, { id: ID_producto, cantidad_stock: nuevoStock });
                    }
                });
            } else {
                dbConn.end();
                result({ message: "Producto no encontrado" }, null);
            }
        });
    }
}