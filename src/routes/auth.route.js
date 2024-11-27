const express = require('express')
const {
	signupController,
	loginController,
} = require('../controllers/auth.controller')
const { signupUserValidation, loginUserValidation } = require('../middleware/validation/authValidation')


const router = express.Router()

router.post('/signup', signupUserValidation, signupController)
router.post('/login',loginUserValidation, loginController)

module.exports = router
