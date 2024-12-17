const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/', cartController.createCart);              // Crear un nuevo carrito
router.get('/:cid', cartController.getCartById);          // Obtener carrito por ID
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);  // Eliminar producto del carrito
router.put('/:cid', cartController.updateProductQuantity);  // Actualizar carrito con productos
router.put('/:cid/products/:pid', cartController.updateProductQuantity);  // Actualizar cantidad de un producto
router.delete('/:cid', cartController.clearCart);         // Eliminar todos los productos del carrito

module.exports = router;
