const express = require('express');
const cors = require('cors');

// Configuración de ExpressJS y servidor
const app = express();
const port = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("¡Bienvenido a la API de MyHomeStock!");
});

/**
 * ENRUTAMIENTOS A LAS ENTIDADES DE LA APLICACIÓN
 */
const usuarioRoutes = require('./src/routes/usuario.routes');
app.use('/api/v1/usuarios', usuarioRoutes);

const inventarioRoutes = require('./src/routes/inventario.routes');
app.use('/api/v1/inventario', inventarioRoutes);

const productoRoutes = require('./src/routes/producto.routes');
app.use('/api/v1/producto', productoRoutes);

const stockRoutes = require('./src/routes/stock.routes');
app.use('/api/v1/stock', stockRoutes);

const compraRoutes = require('./src/routes/compra.routes');
app.use('/api/v1/compra', compraRoutes);

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
