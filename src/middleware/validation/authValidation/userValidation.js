const validator = require('../validator')
const { userSchema } = require('./userSchema')

const signupUserValidation = (req, res, next) =>
	validator(userSchema.signupUser, { ...req.file, ...req.body }, next)

const loginUserValidation = (req, res, next) =>
  validator(userSchema.loginUser, req.body, next)


module.exports = {
  signupUserValidation,
  loginUserValidation
}
