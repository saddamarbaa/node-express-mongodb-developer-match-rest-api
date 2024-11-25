const createHttpError = require('http-errors');

function notFoundMiddleware(req, res, next) {
  next(createHttpError(404, `Route - ${req.originalUrl} Not Found`));
}

module.exports = notFoundMiddleware;