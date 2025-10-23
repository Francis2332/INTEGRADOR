-- =============================================
-- SISTEMA DE ESTACIONAMIENTO - PARKINGDB
-- Base de datos completa con datos de prueba
-- =============================================

-- RECOMENDADO: recrear la BD completamente para evitar conflictos de FK
DROP DATABASE IF EXISTS ParkingDB;
CREATE DATABASE ParkingDB;
USE ParkingDB;

-- --- TABLAS (crear en orden de padres -> hijos) ---

	-- 1. Roles
	CREATE TABLE Roles (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombreRol VARCHAR(50) NOT NULL UNIQUE,
	descripcion VARCHAR(100) NOT NULL
	);


	-- 2. Tipos de Vehículo (TABLA PADRE CLAVE)
	CREATE TABLE TiposVehiculo (
		id INT PRIMARY KEY AUTO_INCREMENT,
		nombreTipo VARCHAR(50) NOT NULL UNIQUE,
		descripcion TEXT
	);


	-- 3. Clientes
	CREATE TABLE Clientes (
		id INT PRIMARY KEY AUTO_INCREMENT,
		dni 	CHAR(8) 	UNIQUE NOT NULL,
		nombre VARCHAR(50) NOT NULL,
		primerApellido VARCHAR(50) NOT NULL,
		segundoApellido VARCHAR(50) NOT NULL,
		telefono VARCHAR(15) UNIQUE,
		CHECK (dni REGEXP '^[0-9]{8}$') -- Usando REGEXP para limitar a los valores del char a números

	);
	-- 4. Espacios (TABLA HIJA - Referencia a TiposVehiculo(id))
	CREATE TABLE Espacios (
		id INT PRIMARY KEY AUTO_INCREMENT,
		codigoEspacio VARCHAR(10) NOT NULL UNIQUE,
		tipoVehiculoId INT NULL,
		estado VARCHAR(20) NOT NULL DEFAULT 'Disponible',
		FOREIGN KEY (tipoVehiculoId) REFERENCES TiposVehiculo(id)
	);

	-- 5. Usuarios (Empleados del parking - usar rolId como FK hacia Roles)
	CREATE TABLE Usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	nombreCompleto VARCHAR(100),
	rolId INT NOT NULL,
	FOREIGN KEY (rolId) REFERENCES Roles(id)
	);

	-- 6. Tarifas (depende de TiposVehiculo)
	CREATE TABLE Tarifas (
	id INT PRIMARY KEY AUTO_INCREMENT,
	tipoVehiculoId INT NOT NULL,
	tarifaPorHora DECIMAL(10,2) NOT NULL,
	descripcion VARCHAR(100),
	fechaInicio DATE NOT NULL,
	FOREIGN KEY (tipoVehiculoId) REFERENCES TiposVehiculo(id)
	);

	-- 7. Vehículos
	CREATE TABLE Vehiculos (
		id INT PRIMARY KEY AUTO_INCREMENT,
		placa VARCHAR(6) NOT NULL UNIQUE
			CHECK (placa REGEXP '^[A-Z]{3}[0-9]{3}$'), -- 
		tipoVehiculoId INT NOT NULL,
		clienteId INT,
		FOREIGN KEY (tipoVehiculoId) REFERENCES TiposVehiculo(id),
		FOREIGN KEY (clienteId) REFERENCES Clientes(id)
	);

	-- 8. Registros (depende de Vehiculos, Espacios, Usuarios (empleados) y ahora Clientes)
	CREATE TABLE Registros (
	id INT PRIMARY KEY AUTO_INCREMENT,
	vehiculoId INT NOT NULL,
	espacioId INT NOT NULL,
	clienteEntradaId INT, -- Referencia al Cliente (OPCIONAL: si el cliente ya está registrado)
	empleadoEntradaId INT NOT NULL, -- Quien registra la entrada (Empleado/Usuario)
	horaEntrada DATETIME NOT NULL,
	horaSalida DATETIME,
	empleadoSalidaId INT, -- Quien registra la salida (Empleado/Usuario)
	montoTotal DECIMAL(10,2),
	estado VARCHAR(20) NOT NULL DEFAULT 'Ocupado',
	FOREIGN KEY (vehiculoId) REFERENCES Vehiculos(id),
	FOREIGN KEY (espacioId) REFERENCES Espacios(id),
	FOREIGN KEY (clienteEntradaId) REFERENCES Clientes(id), -- Nueva FK para el Cliente
	FOREIGN KEY (empleadoEntradaId) REFERENCES Usuarios(id), -- Renombrado de usuarioEntradaId
	FOREIGN KEY (empleadoSalidaId) REFERENCES Usuarios(id) -- Renombrado de usuarioSalidaId
	);

	-- 9. Reportes (depende de Usuarios)
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
    
	-- =============================================


