const express = require('express')
const {
	signupController,
	loginController,
	getAuthProfileController,
	logoutController,
	updateProfileController,
	forgotPasswordController,
	resetPasswordController,
} = require('../controllers/auth.controller')
const {
	signupUserValidation,
	loginUserValidation,
	updateUserValidation,
	forgotUserPasswordValidation,
	resetPasswordValidation,
} = require('../middleware/validation/authValidation')
const { checkIsAuth } = require('../middleware')
const { deleteUserController } = require('../controllers/user.controller')

const router = express.Router()

router.post('/signup', signupUserValidation, signupController)
router.post('/login', loginUserValidation, loginController)
router.post('/logout', checkIsAuth, logoutController)
router.patch(
	'/update/:userId',
	checkIsAuth,
	updateUserValidation,
	updateProfileController,
)

router.delete('/delete/:userId', checkIsAuth, deleteUserController)
router.get('/me', checkIsAuth, getAuthProfileController)
router.post(
	'/forget-password',
	forgotUserPasswordValidation,
	forgotPasswordController,
)

router.post(
	'/reset-password/:userId/:token',
	resetPasswordValidation,
	resetPasswordController,
)

module.exports = router
