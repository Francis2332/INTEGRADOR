//Ruta Api de Espacios de Estacionamiento
// Importa express y el controlador de espacios 
const express = require('express');
const router = express.Router();
const espaciosController = require('../controllers/espaciosController');

router.post('/', espaciosController.createEspacio);

module.exports = router;