const { signupService, loginService, getAuthProfileService } = require('../services/auth.service')

module.exports.signupController = (req, res, next) =>
	signupService(req, res, next)

module.exports.loginController  = (req, res, next) =>loginService(req,res,next)


module.exports.getAuthProfileController = (req, res, next) =>
	 getAuthProfileService(req, res, next)


