-- Elimina la base de datos
DROP DATABASE IF EXISTS myhomestock;

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS myhomestock;
USE myhomestock;

-- Crear tabla de usuario
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL
);

-- Crear tabla de tipo_categoria
CREATE TABLE IF NOT EXISTS tipo_categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,

    nombre VARCHAR(50) NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- Crear tabla de categoria
CREATE TABLE IF NOT EXISTS categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo INT,
    id_usuario INT,

    nombre VARCHAR(50) NOT NULL,

    FOREIGN KEY (id_tipo) REFERENCES tipo_categoria(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- Crear tabla de producto
CREATE TABLE IF NOT EXISTS producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_categoria INT,

    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100),
    cantidad_stock INT,
    cantidad_min_mensual INT,
    favorito BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);

-- Crear tabla de compra 
CREATE TABLE IF NOT EXISTS compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,

    descripcion VARCHAR(100),

    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- Crear tabla de compra_producto
CREATE TABLE IF NOT EXISTS compra_producto (
    id_compra INT,
    id_producto INT,

    cantidad INT NOT NULL DEFAULT 0 CHECK (cantidad >= 0),

    FOREIGN KEY (id_producto) REFERENCES producto(id),
    FOREIGN KEY (id_compra) REFERENCES compra(id)
);
