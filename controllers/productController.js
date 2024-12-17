const Product = require('../models/Product');

// Obtener todos los productos con filtros de paginación, orden y búsqueda
exports.getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = 'asc', query = '' } = req.query;
    const skip = (page - 1) * limit;

    // Filtro para búsqueda
    const filter = query ? { $or: [{ category: query }, { available: query === 'true' }] } : {};

    // Ordenamiento por precio
    const sortOptions = sort === 'desc' ? { price: -1 } : { price: 1 };

    const products = await Product.find(filter).skip(skip).limit(Number(limit)).sort(sortOptions);
    const totalProducts = await Product.countDocuments(filter);

    const totalPages = Math.ceil(totalProducts / limit);
    const response = {
      status: 'success',
      payload: products,
      totalPages,
      page: Number(page),
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}&limit=${limit}` : null,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
