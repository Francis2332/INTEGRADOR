const AuthDAO = require('../models/autenticadorModel');
exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  console.log('Recibida solicitud de login para:', usuario);
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
  }
  try {
    console.log('Ejecutando consulta para usuario:', usuario);
    const user = await AuthDAO.getUserByUsername(usuario, req.db);
    console.log('Resultado de la consulta:', user);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
    if (user.password !== contrasena) return res.status(401).json({ error: 'Contraseña incorrecta' });
    console.log('Login exitoso para:', user.username);
    res.json({ message: 'Login exitoso', user: { id: user.id, username: user.username, rolId: user.rolId } });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en BD' });
  }
};