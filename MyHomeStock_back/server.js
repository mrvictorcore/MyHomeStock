import express, { urlencoded, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriaRoutes from './src/routes/categoria.routes.js';
import CompraProductoRoutes from './src/routes/compra_producto.routes.js';
import productoRoutes from './src/routes/producto.routes.js';
import TipoCategoriaRoutes from './src/routes/tipo_categoria.routes.js';
import compraRoutes from './src/routes/compra.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';

dotenv.config();

// Configuración de ExpressJS y servidor
const app = express();
const port = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear el cuerpo de las solicitudes
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req, res) => {
  res.send("¡Bienvenido a la API de MyHomeStock!");
});

/**
 * ENRUTAMIENTOS A LAS ENTIDADES DE LA APLICACIÓN
 */

app.use('/api/v1/categoria', categoriaRoutes);
app.use('/api/v1/compra_producto', CompraProductoRoutes);
app.use('/api/v1/producto', productoRoutes);
app.use('/api/v1/tipo_categoria', TipoCategoriaRoutes);
app.use('/api/v1/compra', compraRoutes);
app.use('/api/v1/usuario', usuarioRoutes);

/**
 * FIN ENRUTAMIENTOS
 */

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    error: true,
    message: err.message || 'Algo salió mal!'
  });
});

// Comenzamos a escuchar el puerto definido arriba
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
