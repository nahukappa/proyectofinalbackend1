const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getAllProducts);          // Obtener todos los productos con filtros
router.get('/:pid', productController.getProductById);     // Obtener producto por ID

module.exports = router;
