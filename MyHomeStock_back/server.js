import express, { urlencoded, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

import categoriaRoutes from './src/routes/categoria.routes.js';
app.use('/api/v1/categoria', categoriaRoutes);

import CompraProductoRoutes from './src/routes/compra_producto.routes.js';
app.use('/api/v1/compra_producto', CompraProductoRoutes);

import productoRoutes from './src/routes/producto.routes.js';
app.use('/api/v1/producto', productoRoutes);

import TipoCategoriaRoutes from './src/routes/tipo_categoria.routes.js';
app.use('/api/v1/tipo_categoria', TipoCategoriaRoutes);

import compraRoutes from './src/routes/compra.routes.js';
app.use('/api/v1/compra', compraRoutes);

import usuarioRoutes from './src/routes/usuario.routes.js';
app.use('/api/v1/usuario', usuarioRoutes);

/**
 * FIN ENRUTAMIENTOS
 */

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Comenzamos a escuchar el puerto definido arriba
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
