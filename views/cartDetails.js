// /views/cartDetails.js
document.addEventListener('DOMContentLoaded', async () => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      alert('No tienes un carrito creado.');
      return;
    }
  
    const response = await fetch(`/api/carts/${cartId}`);
    const data = await response.json();
  
    if (data.status === 'success') {
      const cartItems = data.payload.products;
      const cartItemsList = document.getElementById('cartItems');
      let totalPrice = 0;
  
      // Mostrar los productos en el carrito
      cartItemsList.innerHTML = ''; // Limpiar el carrito antes de mostrar los nuevos productos
      cartItems.forEach(item => {
        totalPrice += item.productId.price * item.quantity;
  
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.productId.name} - $${item.productId.price} x ${item.quantity}</span>
          <button onclick="removeProduct('${cartId}', '${item.productId._id}')">Eliminar</button>
        `;
        cartItemsList.appendChild(li);
      });
  
      document.getElementById('totalPrice').textContent = `Total: $${totalPrice}`;
    } else {
      alert('No se pudo cargar el carrito');
    }
  
    // Manejar el clic en "Vaciar carrito"
    document.getElementById('clearCartBtn').addEventListener('click', () => {
      clearCart(cartId);
    });
  });
  
  // Eliminar producto del carrito
  async function removeProduct(cartId, productId) {
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, { method: 'DELETE' });
  
    const data = await response.json();
    if (data.status === 'success') {
      alert('Producto eliminado del carrito');
      location.reload();  // Recargar la página para mostrar los cambios
    } else {
      alert('Hubo un error al eliminar el producto');
    }
  }
  
  // Vaciar el carrito
  async function clearCart(cartId) {
    const response = await fetch(`/api/carts/${cartId}`, { method: 'DELETE' });
  
    const data = await response.json();
    if (data.status === 'success') {
      alert('Carrito vacío');
      location.reload();  // Recargar la página para reflejar los cambios
    } else {
      alert('Hubo un error al vaciar el carrito');
    }
  }
  