//Ruta Api de Espacios de Estacionamiento 
//Modelo DAO para Espacios de Estacionamiento
class EspaciosDAO {
  static async checkTipoVehiculoExists(tipoVehiculoId, db) {
    const [results] = await db.query('SELECT id FROM TiposVehiculo WHERE id = ?', [tipoVehiculoId]);
    return results.length > 0;
  }

  static async checkCodigoEspacioExists(codigoEspacio, db) {
    const [results] = await db.query('SELECT codigoEspacio FROM Espacios WHERE codigoEspacio = ?', [codigoEspacio]);
    return results.length > 0;
  }

  static async insertEspacio({ codigoEspacio, tipoVehiculoId, estado }, db) {
    const [result] = await db.query(
      'INSERT INTO Espacios (codigoEspacio, tipoVehiculoId, estado) VALUES (?, ?, ?)',
      [codigoEspacio, tipoVehiculoId, estado]
    );
    return result.insertId;
  }
}

module.exports = EspaciosDAO;