// /views/productDetails.js
document.addEventListener('DOMContentLoaded', async () => {
    const productId = window.location.pathname.split('/').pop();  // Obtener el id del producto desde la URL
    const addToCartBtn = document.getElementById('addToCartBtn');
  
    // Obtener los detalles del producto desde la API
    const response = await fetch(`/api/products/${productId}`);
    const data = await response.json();
  
    if (data.status === 'success') {
      const product = data.payload;
  
      // Mostrar los detalles del producto
      document.getElementById('productName').textContent = product.name;
      document.getElementById('productDescription').textContent = product.description;
      document.getElementById('productPrice').textContent = `Precio: $${product.price}`;
      document.getElementById('productCategory').textContent = `Categoría: ${product.category}`;
      document.getElementById('productImage').src = product.imageUrl || '/default-product.jpg';  // Imagen predeterminada si no tiene
    } else {
      alert('No se encontró el producto.');
    }
  
    // Manejar el clic en "Agregar al carrito"
    addToCartBtn.addEventListener('click', () => {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        addToCart(cartId, productId);
      } else {
        alert('Por favor, crea un carrito primero.');
      }
    });
  });
  
  // Agregar producto al carrito
  async function addToCart(cartId, productId) {
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: 1 }),
    });
  
    const data = await response.json();
    if (data.status === 'success') {
      alert('Producto agregado al carrito');
    } else {
      alert('Hubo un error al agregar el producto al carrito');
    }
  }
  