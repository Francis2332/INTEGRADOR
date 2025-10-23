// backend/models/authModel.js
// Definición del modelo DAO para manejar operaciones relacionadas con la autenticación.
// Este archivo encapsula las consultas SQL para interactuar con la tabla Usuarios.

class AuthDAO {
  // Método estático para obtener un usuario por su nombre de usuario (username).
  // Recibe el nombre de usuario y la conexión a la base de datos como parámetros.
  static async getUserByUsername(username, db) {
    // Ejecuta una consulta SQL para buscar un usuario por su username.
    // Utiliza un parámetro ? para prevenir inyecciones SQL y asegurar seguridad.
    // Devuelve el primer resultado (o null si no existe) como un objeto.
    const [results] = await db.query(
      'SELECT u.id, u.username, u.password, u.nombreCompleto, u.rolId FROM Usuarios u WHERE u.username = ?',
      [username]
    );
    return results[0]; // Retorna el primer registro encontrado, si existe.
  }
}

// Exporta la clase AuthDAO para que pueda ser utilizada en otros módulos.
module.exports = AuthDAO;