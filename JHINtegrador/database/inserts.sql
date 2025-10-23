-- --- INSERTS (padres primero, luego hijos) ---

-- 1. Roles
INSERT INTO Roles (nombreRol, descripcion) VALUES
('Administrador', 'Administrador del sistema'),
('Operario ', 'Empleado con dotes de Register');


-- drop table Roles;

-- 2. Tipos de Vehículo
INSERT INTO TiposVehiculo (nombreTipo, descripcion) VALUES
('Automóvil', 'Vehículo liviano de 4 ruedas'),
-- ('Moto', 'Motocicleta de 2 ruedas'),
('Camioneta', 'Vehículo utilitario de mayor tamaño');
-- ('Bicicleta', 'Vehículo de 2 ruedas no motorizado'),


-- 3. Clientes (NUEVOS DATOS)
INSERT INTO Clientes (nombre, DNI, primerApellido, segundoApellido, telefono) VALUES
('Carlos', '67593819', 'Suarez', 'Algodon' ,'957742236'),
('Ana', '49563218', 'Alcantara', 'Noquieronada','985962478'),
('Roberto', '79625896', 'Peña', 'Frio','986673480'),
('Sonia', '67293819', 'Susurro', 'Santos' ,'974256765'),
('Ruth', '49763218', 'Alca', 'Alvergue','985835783'),
('Alberto', '74625896', 'Pedral', 'Deduardo','945623427'),
('Sodimac', '66593819', 'Sun', 'Sheylon' ,'956874236');


-- 4. Espacios (usa los ids de TiposVehiculo creados arriba)
INSERT INTO Espacios (codigoEspacio, tipoVehiculoId, estado) VALUES
('E01', NULL, 'disponible'),
('E02', NULL, 'disponible'),
('E03', NULL, 'disponible'),
('E04', NULL, 'disponible'),
('E05', NULL, 'disponible'),
('E06', NULL, 'disponible'),
('E07', NULL, 'disponible'),
('E08', NULL, 'disponible'),
('E09', NULL, 'disponible'),
('E10', NULL, 'disponible'),
('E11', NULL, 'disponible'),
('E12', NULL, 'disponible'),
('E13', NULL, 'disponible'),
('E14', NULL, 'disponible'),
('E15', NULL, 'disponible'),
('E16', NULL, 'disponible'),
('E17', NULL, 'disponible'),
('E18', NULL, 'disponible'),
('E19', NULL, 'disponible'),
('E20', NULL, 'disponible');
-- drop table espacios

-- 5. Usuarios (Empleados del parking)
INSERT INTO Usuarios (username, password, nombreCompleto, rolId) VALUES
('tomas12', 'Hola123@', 'Faceles Void', 2), -- ID 1
('holamundo123', 'Brisa@90', 'Brisa Santiago', 2), -- ID 2
('neruda', 'Starlink@12', 'Pablo Neruda', 2), -- ID 3
('grande.olp', 'Manuel123@', 'Manuel Turiso', 2), -- ID 4
('draco34', 'Cree@2034', 'Draco Nia', 2), -- ID 5
('maria90', 'Mari@123', 'Parado B', 2), -- ID 
('simpson', 'Simpsom@123', 'Juan Perez', 2), -- ID 8
('root', 'Root@123', 'Administrador', 1); -- ID 9

-- DROP TABLE Usuarios;


-- 6. Tarifas
INSERT INTO Tarifas (tipoVehiculoId, tarifaPorHora, descripcion, fechaInicio) VALUES
(1, 5, 'Tarifa para automóviles', '2025-11-01'),
(2, 7, 'Tarifa para camionetas', '2025-11-01');


-- 7. Vehículos (Ahora con clienteId)
INSERT INTO Vehiculos (placa, tipoVehiculoId, clienteId) VALUES
('ABC123', 1, 1), -- Vehículo de Carlos
('XYZ789', 1, 2), -- Vehículo de Ana
('ABC456', 1, 3), -- Vehículo de Roberlo
('XUI101', 1, 4), -- Vehículo de 
('CAM977', 2, 5), -- Vehiculo de 
('CAM822', 2, 6), -- 
('NET344', 2, 7);


-- 8. Registros (CORREGIDOS: clienteEntradaId y empleadoEntradaId/empleadoSalidaId)
INSERT INTO Registros (vehiculoId, espacioId, clienteEntradaId, empleadoEntradaId, horaEntrada, horaSalida, empleadoSalidaId, montoTotal, estado) VALUES
-- Vehículo ABC-123 (Cliente Carlos), Empleado tomas12 registra entrada, holamundo123 registra salida
(1, 1, 1, 1, '2025-10-20 08:00:00', '2025-10-20 10:30:00', 2, 12.50, 'Finalizado'),

-- Vehículo XYZ-789 (Cliente Ana), Empleado holamundo123 registra entrada, aún estacionado
(2, 4, 2, 2, '2025-10-22 09:15:00', NULL, NULL, NULL, 'Estacionado'),

-- Vehículo ABC-456 (Cliente Roberto), Empleado Manuel registra entrada, tomas12 registra salida
(3, 6, 3, 4, '2025-10-21 15:00:00', '2025-10-21 17:00:00', 1, 10.00, 'Pagado'),

-- Vehículo XUI-101 (Cliente Sonia), Empleado Draco registra entrada, aún estacionado
(4, 8, 4, 5, '2025-10-22 11:00:00', NULL, NULL, NULL, 'Estacionado'),

-- Vehículo CAM-977 (Cliente Ruth, camioneta), Empleado neruda registra entrada, maria90 salida
(5, 10, 5, 3, '2025-10-21 07:00:00', '2025-10-21 12:00:00', 6, 35.00, 'Finalizado'),

-- Vehículo CAM-822 (Cliente Alberto, camioneta), Empleado simpson registra entrada
(6, 12, 6, 8, '2025-10-22 14:30:00', NULL, NULL, NULL, 'Estacionado');


-- drop table registros;
-- 9. Reportes (usuarioGeneradorId = 9 -> root)
INSERT INTO Reportes (tipoReporte, fechaGeneracion, periodoInicio, periodoFin, datos, usuarioGeneradorId) VALUES
('Ingresos Diarios', '2025-10-22 23:59:00', '2025-10-22', '2025-10-22', '{"totalIngresos":18.75}', 8),
('Ocupación de Espacios', '2025-10-22 18:00:00', '2025-10-22', '2025-10-22', '{"ocupados":3,"disponibles":7}', 8),
('Vehículos Registrados', '2025-10-21 20:00:00', '2025-10-01', '2025-10-21', '{"totalVehiculos":7}', 8);

-- drop table Reportes;

-- --- Verificación: mostrar todo ---
SELECT 'Roles' AS tabla; SELECT * FROM Roles;
SELECT 'TiposVehiculo' AS tabla; SELECT * FROM TiposVehiculo;
SELECT 'Espacios' AS tabla; SELECT * FROM Espacios;
SELECT 'Usuarios' AS tabla; SELECT * FROM Usuarios;
SELECT 'Tarifas' AS tabla; SELECT * FROM Tarifas;
SELECT 'Vehiculos' AS tabla; SELECT * FROM Vehiculos;
SELECT 'Registros' AS tabla; SELECT * FROM Registros;
SELECT 'Reportes' AS tabla; SELECT * FROM Reportes;

-- Select de vehiculo
SELECT 
    id,
    CONCAT(SUBSTRING(placa, 1, 3), '-', SUBSTRING(placa, 4, 3)) AS placa_formateada,
    tipoVehiculoId,
    clienteId
FROM Vehiculos;


-- Borrar base de datos --
-- Drop DATABASE ParkingDB;

-- Mostrar los datos 
SELECT * FROM usuarios;
SELECT * FROM roles;
SELECT * FROM tiposvehiculo;
SELECT * FROM espacios;
SELECT * FROM tarifas;
