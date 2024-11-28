const {
	signupService,
	loginService,
	getAuthProfileService,
	logoutService,
	updateProfileService,
} = require('../services/auth.service')

module.exports.signupController = (req, res, next) =>
	signupService(req, res, next)

module.exports.loginController = (req, res, next) =>
	loginService(req, res, next)

module.exports.logoutController = (req, res, next) =>
	logoutService(req, res, next)

module.exports.getAuthProfileController = (req, res, next) =>
	getAuthProfileService(req, res, next)


module.exports.updateProfileController =(req, res, next) =>updateProfileService(req,res,next)
