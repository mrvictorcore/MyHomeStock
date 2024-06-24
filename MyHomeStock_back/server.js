import express, { urlencoded, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import categoriaRoutes from './src/routes/categoria.routes.js';
import CompraProductoRoutes from './src/routes/compra_producto.routes.js';
import productoRoutes from './src/routes/producto.routes.js';
import TipoCategoriaRoutes from './src/routes/tipo_categoria.routes.js';
import compraRoutes from './src/routes/compra.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(urlencoded({ extended: true }));
app.use(json()); // Middleware para parsear JSON

// Morgan para registrar las solicitudes
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("¡Bienvenido a la API de MyHomeStock!");
});

// Enrutamientos
app.use('/api/v1/categoria', categoriaRoutes);
app.use('/api/v1/compra_producto', CompraProductoRoutes);
app.use('/api/v1/producto', productoRoutes);
app.use('/api/v1/tipo_categoria', TipoCategoriaRoutes);
app.use('/api/v1/compra', compraRoutes);
app.use('/api/v1/usuario', usuarioRoutes);

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: true, message: 'Formato JSON inválido.' });
  }
  res.status(err.status || 500).send({
    error: true,
    message: err.message || 'Algo salió mal!'
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});