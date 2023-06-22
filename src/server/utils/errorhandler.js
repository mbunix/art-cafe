// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error status code
  let statusCode = 500;

  // Check if the error has a status code
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  // Default error message
  let message = 'Internal Server Error';

  // Check if the error has a custom message
  if (err.message) {
    message = err.message;
  }

  // Send error response
  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
