const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.config');
const apiRoutes = require('./src/routes/index');
const errorMiddleware = require('./src/middlewares/error.middleware');
const AppError = require('./src/utils/app-error');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Establish database connection
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

// API Route Registry
app.use('/api', apiRoutes);

// Base ping endpoint for healthchecks
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
    db_state: require('mongoose').connection.readyState === 1 ? 'CONNECTED' : 'MOCK_FALLBACK'
  });
});

// Capture and process unmapped requests (404s)
app.all('*', (req, res, next) => {
  next(new AppError(`Endpoint '${req.originalUrl}' does not exist on this server.`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

// Initialize HTTP server listener
const server = app.listen(PORT, () => {
  console.log(`🚀 .dot Server running on port ${PORT}`);
});

// Graceful rejection handling
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION 💥 Shutting down server...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
