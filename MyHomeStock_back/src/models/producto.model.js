import { getConnection } from '../../config/db.config.js';

export class Producto {
    constructor(producto) {
        this.id                     = producto.id;
        this.id_usuario             = producto.id_usuario;
        this.id_categoria           = producto.id_categoria;
        
        this.nombre                 = producto.nombre;
        this.descripcion            = producto.descripcion;
        this.cantidad_stock         = producto.cantidad_stock;
        this.cantidad_min_mensual   = producto.cantidad_min_mensual;
        this.favorito               = producto.favorito;
    }

    static async findAll() {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM producto");
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async create(newProducto) {    
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("INSERT INTO producto SET ?", newProducto);
            return { affectedRows: res.affectedRows, insertId: res.insertId };
        } catch (err) {
            throw err;
        }
    }

    static async findById(idProducto) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM producto WHERE id = ?", [idProducto]);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async update(id, producto){
        const dbConn = getConnection();
        const query = `
            UPDATE producto 
            SET nombre=?, 
                descripcion=?, 
                cantidad_stock=?, 
                id_usuario=?, 
                id_categoria=?, 
                cantidad_min_mensual=?, 
                favorito=? 
            WHERE id = ?
        `;

        try {
            const [res] = await dbConn.query(query, [producto.nombre, producto.descripcion, producto.cantidad_stock, producto.id_usuario, producto.id_categoria, producto.cantidad_min_mensual, producto.favorito, id]);
            return { affectedRows: res.affectedRows };
        } catch (err) {
            throw err;
        } 
    }
    
    static async remove(idProducto){
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("DELETE FROM producto WHERE id = ?", [idProducto]);
            return { affectedRows: res.affectedRows }
        } catch (err) {
            throw err;
        }
    }

    static async findByUsuarioId(id_usuario) {    
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM producto WHERE id_usuario = ?", id_usuario);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async findFavoritesOrStock(id_usuario) {
        const dbConn = getConnection();

        try {
            const [res] = await dbConn.query("SELECT * FROM producto WHERE id_usuario = ? AND (cantidad_stock > 0 OR favorito = 1)", [id_usuario]);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async toggleFavorito(idProducto) {
        const dbConn = getConnection();

        try {
            const [resFavorito] = await dbConn.query("SELECT favorito FROM producto WHERE id = ?", [idProducto]);
            let productoFavorito = resFavorito[0].favorito;
            let nuevoEstadoFavorito = !productoFavorito;

            const [res] = await dbConn.query("UPDATE producto SET favorito = ? WHERE id = ?", [nuevoEstadoFavorito]);
            return { affectedRows: res.affectedRows };
        } catch (err) {
            throw err;
        }
    }

    static async updateStock(id, cantidad) {
        const dbConn = getConnection();
        try {
            const [res] = await dbConn.query("UPDATE producto SET cantidad_stock = cantidad_stock + ? WHERE id = ?", [cantidad, id]);
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async adjustStockRestar(idProducto, cantidadAjuste) {
        const dbConn = getConnection();
        try {
            // Realizar la actualización del stock asegurando que no caiga por debajo de cero GREATEST(0, cantidad_stock + ?).
            const queryUpdate = `
                UPDATE producto 
                SET cantidad_stock = GREATEST(0, cantidad_stock - ?) 
                WHERE id = ?
            `;
            
            const [updateResult] = await dbConn.query(queryUpdate, [cantidadAjuste, idProducto]);

            if (updateResult.affectedRows === 0) {
                throw new Error("Producto no encontrado o stock insuficiente");
            }

            // const [newStockResult] = await dbConn.query("SELECT cantidad_stock FROM producto WHERE id = ?", [idProducto]);
            return { affectedRows: updateResult.affectedRows };
        } catch (err) {
            throw err;
        }
    }

    static async adjustStockSumar(idProducto, cantidadAjuste) {
        const dbConn = getConnection();
        try {
            const queryUpdate = `
                UPDATE producto 
                SET cantidad_stock = cantidad_stock + ? 
                WHERE id = ?
            `;
            
            const [updateResult] = await dbConn.query(queryUpdate, [cantidadAjuste, idProducto]);

            if (updateResult.affectedRows === 0) {
                throw new Error("Producto no encontrado");
            }

            // const [newStockResult] = await dbConn.query("SELECT cantidad_stock FROM producto WHERE id = ?", [idProducto]);
            return { affectedRows: updateResult.affectedRows };
        } catch (err) {
            throw err;
        }
    }
}