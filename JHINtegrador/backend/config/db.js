const mysql = require('mysql2');

let instance = null;

class DbConnection {
    constructor() {
        if (!instance) {
            this.pool = mysql.createPool({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || 'password123',
                database: process.env.DB_NAME || 'ParkingDB',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            instance = this;
        }
        return instance; // ✅ Ahora está dentro del constructor
    }

    getPool() {
        return this.pool;
    }
} // ✅ Cierra la clase correctamente

const db = new DbConnection().getPool(); // ✅ Ahora está FUERA de la clase
module.exports = db.promise();


/*

const mysql = require('mysql2');

let instance = null;
//Utilizando Singleton para la conexión de base de datos
// Esto asegura que solo haya una instancia de la conexión a la base de datos
class DbConnection {
  constructor() {
    if (!instance) { // Si no hay instancia, crear una nueva
      this.pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password123', //Cambia la contraseña por la que pusiste
        database: process.env.DB_NAME || 'ParkingDB',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      instance = this; // Asigna la instancia creada
    }
    return instance; // Retorna la instancia existente
  }

  getPool() {
    return this.pool; // Retorna el pool de conexiones
  }
}

const db = new DbConnection().getPool(); // Crear la instancia del pool de conexiones
module.exports = db.promise(); // Exporta el pool con soporte para promesas*/