'use strict';

const mysql = require('mysql2');

// Función para crear una nueva conexión
function createNewConnection() {

  //local mysql db connection
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'MyHomeStock'
  });
  return connection;
}
// Función para obtener una conexión
function getConnection() {
    const connection = createNewConnection();
    return connection;
}
// Exportar la función getConnection
module.exports = getConnection;