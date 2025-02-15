const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
