const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Unauthorized access! Token is missing or invalid.' });
  }

  return res.status(500).json({ message: 'Internal server error! Please try again later.' });
};

module.exports = errorMiddleware;
