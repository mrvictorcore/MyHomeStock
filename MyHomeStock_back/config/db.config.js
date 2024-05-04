'use strict';

import { createPool } from 'mysql2';

// Creación de un pool de conexiones
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "MyHomeStock",
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para obtener una conexión del pool
export function getConnection() {
  return pool.promise();
}