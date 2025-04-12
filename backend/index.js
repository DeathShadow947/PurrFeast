const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/products', productRoutes); // Will serve /api/products
app.use('/api/auth', authRoutes);

// Simple Test Route
app.get('/', (req, res) => {
  res.send('🐾 PurrFeast API is live!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
