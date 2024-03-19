-- Elimina la base de datos
DROP DATABASE IF EXISTS MyHomeStock;

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS MyHomeStock;
USE MyHomeStock;

-- Crear tabla de Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_usuario VARCHAR(50) NOT NULL,
    Contrasena VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL
);

-- Crear tabla de Categorías
CREATE TABLE IF NOT EXISTS Categoria (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_categoria VARCHAR(50) NOT NULL
);

-- Crear tabla de Tipos
CREATE TABLE IF NOT EXISTS Tipo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_tipo VARCHAR(50) NOT NULL
);

-- Crear tabla de Descripciones
CREATE TABLE IF NOT EXISTS Descripcion (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_categoria INT,
    ID_tipo INT,
    Nombre_descripcion VARCHAR(50) NOT NULL,
    FOREIGN KEY (ID_categoria) REFERENCES Categoria(ID),
    FOREIGN KEY (ID_tipo) REFERENCES Tipo(ID)
);

-- Crear tabla de Productos con columna "favorito"
CREATE TABLE IF NOT EXISTS Producto (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_producto VARCHAR(100) NOT NULL,
    ID_categoria INT,
    ID_tipo INT,
    ID_descripcion INT,
    Cantidad_stock INT,
    Cantidad_min_mensual INT,
    Favorito BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ID_categoria) REFERENCES Categoria(ID),
    FOREIGN KEY (ID_tipo) REFERENCES Tipo(ID),
    FOREIGN KEY (ID_descripcion) REFERENCES Descripcion(ID)
);

-- Crear tabla de Compras
CREATE TABLE IF NOT EXISTS Compra (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_producto INT,
    Cantidad_comprar INT,
    Seleccionado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ID_producto) REFERENCES Producto(ID)
);
