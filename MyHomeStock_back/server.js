const express = require('express');
const bodyParser = require('body-parser');

// Configuración de ExpressJS y servidor
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

// Configuración de CORS
// app.use(cors({
//     origin: 'https://finanzaspersonales.up.railway.app', // URL de la aplicación Angular
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
//     allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
// }));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("¡Bienvenido a la API de MyHomeStock!");
});

/**
 * ENRUTAMIENTOS A LAS ENTIDADES DE LA APLICACIÓN
 */

const usuarioRoutes = require('./src/routes/usuario.routes')
app.use('/api/v1/usuarios', usuarioRoutes)

const inventarioRoutes = require('./src/routes/inventario.routes')
app.use('/api/v1/inventario', inventarioRoutes)

const productoRoutes = require('./src/routes/producto.routes')
app.use('/api/v1/producto', productoRoutes)

const stockRoutes = require('./src/routes/stock.routes')
app.use('/api/v1/stock', stockRoutes)

const compraRoutes = require('./src/routes/compra.routes')
app.use('/api/v1/compra', compraRoutes)

/**
 * FIN ENRUTAMIENTOS
 */

// Comenzamos a escuchar el puerto definido arriba
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});