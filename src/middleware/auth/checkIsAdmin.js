const createHttpError = require('http-errors')

module.exports = function checkIsAdmin(req, res, next) {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		return next(createHttpError(403, 'Auth Failed (Unauthorized)'))
	}
}
