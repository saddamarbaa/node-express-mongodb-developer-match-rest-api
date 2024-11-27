const express = require('express')
const {
	signupController,
	loginController,
	getAuthProfileController,
} = require('../controllers/auth.controller')
const {
	signupUserValidation,
	loginUserValidation,
} = require('../middleware/validation/authValidation')
const { checkIsAuth } = require('../middleware')

const router = express.Router()

router.post('/signup', signupUserValidation, signupController)
router.post('/login', loginUserValidation, loginController)
router.get('/me', checkIsAuth, getAuthProfileController)

module.exports = router
