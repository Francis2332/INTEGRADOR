// backend/routes/authRoutes.js
// Definición de las rutas relacionadas con la autenticación.
// Este archivo configura un enrutador (router) para manejar solicitudes HTTP específicas.

const express = require('express');
// Crea una instancia de Router, que permite definir rutas modulares.
const router = express.Router();

// Importa el controlador de autenticación que contiene la lógica de negocio.
const authController = require('../controllers/autenticadorController');

// Define la ruta POST para el login, que procesa las credenciales del usuario.
router.post('/login', authController.login);

// Exporta el router para que pueda ser utilizado en index.js.
module.exports = router;