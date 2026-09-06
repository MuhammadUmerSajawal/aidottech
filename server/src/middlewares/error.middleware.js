/**
 * Centralized global error handling middleware for Express.
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log critical programming or system errors
  if (err.statusCode === 500) {
    console.error('SYSTEM ERROR 💥:', err);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
