require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB, isDbConnected } = require('./config/db');

// Route imports
const outletRoutes = require('./routes/outletRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'GoBite Campus Pre-Ordering Backend API',
    database: isDbConnected() ? 'MongoDB Atlas Connected' : 'Prototype Standby (Set MONGODB_URI in .env)',
    atlasConnected: isDbConnected(),
    timestamp: new Date().toISOString()
  });
});

// Root welcome & API sitemap
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the GoBite Campus Food Pre-Ordering Backend API',
    version: '1.0.0 (50% Prototype)',
    endpoints: {
      health: 'GET /api/health',
      outlets: 'GET /api/outlets',
      menu: 'GET /api/menu',
      orders: 'GET, POST /api/orders',
      orderStatus: 'PATCH /api/orders/:identifier/status',
      razorpayOrder: 'POST /api/payment/create-order',
      adminStats: 'GET /api/admin/stats'
    }
  });
});

// Mount Routes
app.use('/api/outlets', outletRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Initialize MongoDB Atlas connection & Start Server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 GoBite Backend Server running on port ${PORT}`);
    console.log(`🔗 Local URL: http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`======================================================\n`);
  });
};

startServer();

module.exports = app;
