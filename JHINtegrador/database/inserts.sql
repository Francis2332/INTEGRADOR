-- Insertar roles iniciales

-- Insertar usuario admin para login


-- Mostrar datos de ussuario

-- Roles
INSERT INTO Roles (nombreRol, descripcion) VALUES
('Administrador', 'Acceso completo al sistema'),
('Operario', 'Puede registrar entradas y salidas'),
('Supervisor', 'Puede generar reportes y supervisar'),
('Usuario de tiempo completo', 'Cliente con plan de tiempo completo'),
('Usuario de medio tiempo', 'Cliente con plan de medio tiempo'),
('Cliente', 'Cliente general');

-- Tipos de Vehículo
INSERT INTO TiposVehiculo (nombreTipo, descripcion) VALUES
('Automóvil', 'Vehículo de 4 ruedas estándar'),
('Moto', 'Vehículo de 2 ruedas'),
('Camioneta', 'Vehículo grande o SUV');

-- Espacios
INSERT INTO Espacios (codigoEspacio, tipoVehiculoId, estado) VALUES
('A01', 1, 'Disponible'),
('A02', 1, 'Disponible'),
('M01', 2, 'Disponible'),
('C01', 3, 'Disponible');

-- Tarifas
INSERT INTO Tarifas (tipoVehiculoId, tarifaPorHora, descripcion, fechaInicio) VALUES
(1, 5.00, 'Tarifa por automóvil', '2024-01-01'),
(2, 3.00, 'Tarifa por moto', '2024-01-01'),
(3, 7.00, 'Tarifa por camioneta', '2024-01-01');


-- Insertar usuario 
INSERT INTO Usuarios (username, password, nombreCompleto, rolId) VALUES
('tomas12', 'Hola', 'Faceles Void', 3),
('holamundo123', 'Brisa', 'Brisa Santiago', 2),
('neruda', '&&&&&&', 'Pablo Neruda', 3),
('grande.olp', 'Manuel', 'Manuel Turiso', 2),
('draco34', 'CREER2034', 'Draco Nia', 3),
('maria90', '908769', 'Parado B', 2),
('root', 'root123', 'Administrador ', 1),
('simpson', 'simpsom123', 'Juan Perez', 2);

-- Vehículos
INSERT INTO Vehiculos (placa, tipoVehiculoId) VALUES
('ABC123', 1),
('XYZ789', 2),
('CAM456', 3),
('XYZ031', 2),
('CAR737', 1),
('CAR22', 1),
('MOTO44', 2);


-- Borrar base de datos --
-- Drop DATABASE ParkingDB;

-- Mostrar los datos 
SELECT * FROM usuarios;
SELECT * FROM roles;
SELECT * FROM tiposvehiculo;
SELECT * FROM espacios;
SELECT * FROM tarifas;
