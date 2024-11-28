const express = require('express')
const {
	signupController,
	loginController,
	getAuthProfileController,
	logoutController,
	updateProfileController,
} = require('../controllers/auth.controller')
const {
	signupUserValidation,
	loginUserValidation,
	updateUserValidation,
} = require('../middleware/validation/authValidation')
const { checkIsAuth } = require('../middleware')

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
router.get('/me', checkIsAuth, getAuthProfileController)

module.exports = router
