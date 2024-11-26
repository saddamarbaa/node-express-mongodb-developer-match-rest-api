const { signupService, loginService } = require('../services/auth.service')

module.exports.signupController = (req, res, next) =>
	signupService(req, res, next)


module.exports.loginController  = (req, res, next) =>loginService(req,res,next)
