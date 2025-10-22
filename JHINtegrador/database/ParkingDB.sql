-- =============================================
-- SISTEMA DE ESTACIONAMIENTO - PARKINGDB
-- Base de datos completa con datos de prueba
-- =============================================

CREATE DATABASE ParkingDB;
USE ParkingDB;

-- --- TABLAS (crear en orden de padres -> hijos) ---

-- Roles
CREATE TABLE Roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombreRol VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(100) NOT NULL
);

-- Tipos de Vehículo
CREATE TABLE TiposVehiculo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombreTipo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Espacios (depende de TiposVehiculo)
CREATE TABLE Espacios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigoEspacio VARCHAR(10) NOT NULL UNIQUE,
    tipoVehiculoId INT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Disponible',
    FOREIGN KEY (tipoVehiculoId) REFERENCES TiposVehiculo(id)
);

-- Usuarios (usar rolId como FK hacia Roles)
CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombreCompleto VARCHAR(100),
    rolId INT NOT NULL,
    FOREIGN KEY (rolId) REFERENCES Roles(id)
);

-- Tarifas (depende de TiposVehiculo)
CREATE TABLE Tarifas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipoVehiculoId INT NOT NULL,
    tarifaPorHora DECIMAL(10,2) NOT NULL,
    descripcion VARCHAR(100),
    fechaInicio DATE NOT NULL,
    FOREIGN KEY (tipoVehiculoId) REFERENCES TiposVehiculo(id)
);

-- Vehículos (depende de TiposVehiculo)
CREATE TABLE Vehiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) NOT NULL UNIQUE,
    tipoVehiculoId INT NOT NULL,
    FOREIGN KEY (tipoVehiculoId) REFERENCES TiposVehiculo(id)
);

-- Registros (depende de Vehiculos, Espacios, Usuarios)
CREATE TABLE Registros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehiculoId INT NOT NULL,
    espacioId INT NOT NULL,
    usuarioEntradaId INT NOT NULL,
    horaEntrada DATETIME NOT NULL,
    horaSalida DATETIME,
    usuarioSalidaId INT,
    montoTotal DECIMAL(10,2),
    estado VARCHAR(20) NOT NULL DEFAULT 'Estacionado',
    FOREIGN KEY (vehiculoId) REFERENCES Vehiculos(id),
    FOREIGN KEY (espacioId) REFERENCES Espacios(id),
    FOREIGN KEY (usuarioEntradaId) REFERENCES Usuarios(id),
    FOREIGN KEY (usuarioSalidaId) REFERENCES Usuarios(id)
);

-- Reportes (depende de Usuarios)
CREATE TABLE Reportes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipoReporte VARCHAR(50) NOT NULL,		
    fechaGeneracion DATETIME NOT NULL,
    periodoInicio DATE,
    periodoFin DATE,
    datos TEXT,
    usuarioGeneradorId INT,
    FOREIGN KEY (usuarioGeneradorId) REFERENCES Usuarios(id)
);


-- --- DATOS INICIALES ---

