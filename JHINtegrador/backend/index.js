require('dotenv').config();  // Carga .env automáticamente para variables de entorno 
const express = require('express'); // Importa express para crear el servidor HTTP
const mysql = require('mysql2/promise'); // Importa mysql2 con soporte para promesas
const cors = require('cors'); // Importa cors para manejar solicitudes cross-origin
// Configuración de la conexión a la base de datos usando el módulo db.js
const db = require('./config/db');
const app = express();
const PORT = 3000;      //Puerto para el Node.js

// Middleware 
app.use(cors());
app.use(express.json());

//Configurando un pool de conexiones con promesas que soportan await/async
//Se usa un pool para mejor manejo de múltiples conexiones

// Conexión a MySQL
// Configuración de la conexión a la base de datos version callback
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password123', // cambia si tu MySQL usa otra clave
//     database: 'ParkingDB',
// });

//Modificando temporalmente para la conexion de prueba
/*ddb.connect(err => {
    if (err) {
        console.error(' Error al conectar a MySQL:', err);
        return;
    }
    console.log('✅ Conectado a MySQL - ParkingDB');

    // Prueba de consulta
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            console.error('Error en consulta de prueba:', err);
        } else {
            console.log('Consulta de prueba exitosa:', results[0].result); // Debería mostrar 2
        }
    });
});*/

 // Coneccion inicial 
 // Se usa then() y catch() para manejar la promesa devuelta por getConnection(), en lugar de 
 // callbacks (err, results) => {}
//  db.getConnection()
//   .then(connection => {
//     console.log('✅ Conectado a MySQL - ParkingDB');
//     connection.release(); // Libera la conexión después de verificar
//   })
//   .catch(err => {
//     console.error('Error al conectar a MySQL:', err);
//   });

/*
//Conexion inicial 
db.connect(err => {
    if (err) {
        console.error(' Error al conectar a MySQL:', err);
        return;
    }
    console.log('✅ Conectado a MySQL - ParkingDB');
});
*/
// ====================== MIDDLEWARE =======================
// Inyecta db en req para controllers
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Prueba inicial de conexion 
db.getConnection()
  .then(connection => {
    console.log('✅ Conectado a MySQL - ParkingDB');
    connection.release(); // Libera la conexión después de verificar
  })
  .catch(err => {
    console.error('Error al conectar a MySQL:', err);
  });

  // Carga las rutas migradas
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/tipos-vehiculo', require('./routes/tiposVehiculoRoutes'));
app.use('/api/espacios', require('./routes/espaciosRoutes')); // Añade esta línea
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/entradas', require('./routes/entradasRoutes'));
app.use('/api/salidas', require('./routes/salidasRoutes'));
app.use('/api/tarifas', require('./routes/tarifasRoutes'));
app.use('/api/historial', require('./routes/historialRoutes')); 
// (Añade otras rutas como tarifasRoutes, historialRoutes cuando las migres)
// ======================= RUTAS =======================

// GET - Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
        res.json(results);
    });
});
// POST - Tipos de Vehiculo
app.post('/api/tipos-vehiculo', (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { nombreTipo, descripcion } = req.body;
    if (!nombreTipo || !descripcion) {
        console.log('Campos faltantes');
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const query = 'INSERT INTO TiposVehiculo (nombreTipo, descripcion) VALUES (?, ?)';
    console.log('Query:', query, 'Params:', [nombreTipo, descripcion]);
    db.query(query, [nombreTipo, descripcion], (err, result) => {
        if (err) {
            console.error(' Error al insertar tipo de vehículo:', err);
            return res.status(500).json({ error: 'Error al insertar tipo de vehículo' });
        }
        console.log('Tipo de vehículo insertado:', result.insertId);
        res.json({ message: 'Tipo de vehículo agregado con éxito', id: result.insertId });
    });
});


//POST - Espacios de Estacionamiento (Older version)
// app.post('/api/espacios', (req, res) => {
//     console.log('Datos recibidos:', req.body);
//     const { codigoEspacio, tipoVehiculoId, estado } = req.body;
//     if (!codigoEspacio || !tipoVehiculoId || !estado){
//         console.log('Campos faltantes');
//         return res.status(400).json({error: 'Todos los campo son obligatorios'});
//     }
//     const query = 'INSERT INTO Espacios (codigoEspacio, tipoVehiculoId, estado) VALUES (?, ?, ?)';
//     console.log('Query:', query, 'Params:', [codigoEspacio, tipoVehiculoId, estado]);
//     db.query (query, [codigoEspacio, tipoVehiculoId, estado], (err, result) => {
//         if (err){
//             console.error(' Error al insertar espacio de estacionamiento:', err);
//             return res.status(500).json({ error: 'Error al insertar espacio de estacionamiento' });
//         }
//         console.log('Espacio de estacionamiento insertado:', result.insertId);
//         res.json({ message: 'Espacio de estacionamiento agregado con éxito', id: result.insertId });
//     });
// });

//New version using MVC/DAO pattern
// Rutas existentes (migra las demás como esta)
app.use('/api/espacios', require('./routes/espaciosRoutes'));

// POST - Insertar nuevo usuario
app.post('/api/usuarios', (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { username, password, nombreCompleto, rolId } = req.body;

    if (!username || !password || !nombreCompleto || !rolId) {
        console.log('Campos faltantes');
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO Usuarios (username, password, nombreCompleto, rolId) VALUES (?, ?, ?, ?)'; // Usar placeholders para evitar SQL injection
    console.log('Query:', query, 'Params:', [username, password, nombreCompleto, rolId]); // Depuración de la consulta y parámetros
    db.query(query, [username, password, nombreCompleto, rolId], (err, result) => { // Pasar los parámetros como un array
        if (err) {
            console.error(' Error al insertar usuario:', err);
            return res.status(500).json({ error: 'Error al insertar usuario' });
        }

        console.log('Usuario insertado:', result.insertId);
        res.json({ message: 'Usuario agregado con éxito', id: result.insertId });
    });
});

// POST - Login
app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body;
    console.log('Login attempt for usuario:', usuario);

    if (!usuario || !contrasena) {
        console.log('Campos faltantes');
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    const query = `
        SELECT u.id, u.username, u.password, u.nombreCompleto, u.rolId
        FROM Usuarios u
        JOIN Roles r ON u.rolId = r.id
        WHERE u.username = ?
    `;
    console.log('Executing query:', query, 'with param:', usuario);

    db.query(query, [usuario], (err, results) => {
        console.log('Query error:', err);
        console.log('Query results:', results);
        if (err) return res.status(500).json({ error: 'Error en BD' });
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        console.log('User found:', user);
        if (user.password !== contrasena) {
            console.log('Password mismatch');
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        console.log('Login successful');
        res.json({
            message: 'Login exitoso',
            user: { id: user.id, username: user.username, rolId: user.rolId } //EL error venía de aqui, era porque había puesto nombrerol, no poner eso jamas :v
        });
    });
});

// POST - Registrar entrada de vehículo
app.post('/api/registrar-entrada', (req, res) => {
    console.log('Datos recibidos para registrar entrada:', req.body);
    const { dni, telefono, nombre, primerApellido, segundoApellido, placa, tipoVehiculoId, espacioId, horaEntrada, observaciones } = req.body;

    if (!dni || !telefono || !nombre || !primerApellido || !segundoApellido || !placa || !tipoVehiculoId || !espacioId || !horaEntrada) {
        console.log('Campos faltantes');
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Iniciar transacción
    db.beginTransaction(err => {
        if (err) {
            console.error('Error al iniciar transacción:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        // 1. Insertar o obtener cliente
        const clienteQuery = 'INSERT INTO Clientes (dni, telefono, nombre, primerApellido, segundoApellido) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
        db.query(clienteQuery, [dni, telefono, nombre, primerApellido, segundoApellido], (err, clienteResult) => {
            if (err) {
                console.error('Error al insertar cliente:', err);
                return db.rollback(() => res.status(500).json({ error: 'Error al registrar cliente' }));
            }

            const clienteId = clienteResult.insertId;
            console.log('Cliente ID:', clienteId);

            // 2. Insertar o obtener vehículo
            const vehiculoQuery = 'INSERT INTO Vehiculos (placa, tipoVehiculoId, clienteId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
            db.query(vehiculoQuery, [placa, tipoVehiculoId, clienteId], (err, vehiculoResult) => {
                if (err) {
                    console.error('Error al insertar vehículo:', err);
                    return db.rollback(() => res.status(500).json({ error: 'Error al registrar vehículo' }));
                }

                const vehiculoId = vehiculoResult.insertId;
                console.log('Vehículo ID:', vehiculoId);

                // 3. Insertar entrada
                const entradaQuery = 'INSERT INTO Entradas (vehiculoId, espacioId, horaEntrada, observaciones) VALUES (?, ?, ?, ?)';
                db.query(entradaQuery, [vehiculoId, espacioId, horaEntrada, observaciones || null], (err, entradaResult) => {
                    if (err) {
                        console.error('Error al insertar entrada:', err);
                        return db.rollback(() => res.status(500).json({ error: 'Error al registrar entrada' }));
                    }

                    console.log('Entrada registrada:', entradaResult.insertId);

                    // Confirmar transacción
                    db.commit(err => {
                        if (err) {
                            console.error('Error al confirmar transacción:', err);
                            return db.rollback(() => res.status(500).json({ error: 'Error al confirmar registro' }));
                        }

                        res.json({ message: 'Entrada de vehículo registrada exitosamente', entradaId: entradaResult.insertId });
                    });
                });
            });
        });
    });
});

// GET - Obtener entradas recientes
app.get('/api/entradas', (req, res) => {
    const query = `
        SELECT e.id, e.horaEntrada, e.observaciones,
               c.dni, c.nombre, c.primerApellido, c.segundoApellido, c.telefono,
               v.placa, tv.nombre AS tipoVehiculo,
               es.nombre AS espacio
        FROM Entradas e
        JOIN Vehiculos v ON e.vehiculoId = v.id
        JOIN Clientes c ON v.clienteId = c.id
        JOIN TiposVehiculo tv ON v.tipoVehiculoId = tv.id
        JOIN Espacios es ON e.espacioId = es.id
        ORDER BY e.horaEntrada DESC
        LIMIT 50
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener entradas:', err);
            return res.status(500).json({ error: 'Error al obtener entradas' });
        }
        res.json(results);
    });
});

// =====================================================

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
