//Ruta Api de Espacios de Estacionamiento
//Controlador para Espacios de Estacionamiento
//Utiliza el modelo EspaciosDAO para operaciones de base de datos
const EspaciosDAO = require('../models/espaciosModel');

exports.createEspacio = async (req, res) => {
  const { codigoEspacio, tipoVehiculoId, estado } = req.body;

  const missingFields = [];
  if (!codigoEspacio) missingFields.push('codigoEspacio');
  if (!tipoVehiculoId) missingFields.push('tipoVehiculoId');
  if (!estado) missingFields.push('estado');
  if (missingFields.length) {
    console.log('Campos faltantes:', missingFields);
    return res.status(400).json({ error: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
  }

  const validEstados = ['disponible', 'ocupado'];
  if (!validEstados.includes(estado)) {
    console.log('Estado inválido:', estado);
    return res.status(400).json({ error: `Estado inválido. Debe ser uno de: ${validEstados.join(', ')}` });
  }

  try {
    const codigoExists = await EspaciosDAO.checkCodigoEspacioExists(codigoEspacio, req.db);
    if (codigoExists) {
      return res.status(400).json({ error: 'El codigoEspacio ya existe' });
    }

    const tipoExists = await EspaciosDAO.checkTipoVehiculoExists(tipoVehiculoId, req.db);
    if (!tipoExists) {
      console.log('tipoVehiculoId no encontrado:', tipoVehiculoId);
      return res.status(400).json({ error: 'El tipoVehiculoId proporcionado no existe' });
    }

    const id = await EspaciosDAO.insertEspacio({ codigoEspacio, tipoVehiculoId, estado }, req.db);
    console.log('Espacio insertado:', id);
    res.status(201).json({ message: 'Espacio de estacionamiento agregado con éxito', id });
  } catch (err) {
    console.error('Error en createEspacio:', err);
    res.status(500).json({ error: 'Error al insertar espacio de estacionamiento' });
  }
};