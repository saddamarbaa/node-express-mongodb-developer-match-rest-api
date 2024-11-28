const validator = require('../validator')
const { userSchema } = require('./userSchema')

const signupUserValidation = (req, res, next) =>
	validator(userSchema.signupUser, { ...req.file, ...req.body }, next)

const loginUserValidation = (req, res, next) =>
  validator(userSchema.loginUser, req.body, next)


 const updateUserValidation = (req, res, next) =>
  validator(userSchema.updateUser, { ...req.file, ...req.body, ...req.params }, next);


module.exports = {
  signupUserValidation,
  loginUserValidation,
  updateUserValidation
}
