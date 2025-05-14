function errorHandler(err, req, res, next) {
  // jwt authorization error
    if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Token invalide ou non fourni!' });
  }
  if (err.name === 'ValidationError') {
    return res.status(401).json({ message: err });
  }
  //default error
  return res.status(500).json({ message: err });
}
module.exports = errorHandler;
