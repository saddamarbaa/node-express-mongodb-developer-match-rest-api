const createHttpError = require('http-errors')

module.exports = function checkIsAuth(req, res, next) {
	if (req.user && req?.user?.token) {
		next()
	} else {
		return next(createHttpError(403, 'Auth Failed (Unauthorized)'))
	}
}
