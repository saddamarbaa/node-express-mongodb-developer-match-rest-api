const createHttpError = require('http-errors')
const User = require('../models/User.model')
const { customResponse } = require('../utils')

module.exports.signupService = async (req, res, next) => {
	const { email, password, firstName, lastName, confirmPassword, gender } =
		req.body

	try {
		const isEmailExit = await User.findOne({
			email: new RegExp(`^${email}$`, 'i'),
		})

		if (isEmailExit) {
			return next(
				createHttpError(
					409,
					`E-Mail address ${email} is already exists, please pick a different one.`,
				),
			)
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			gender,
		})

		const user = await newUser.save()
		return res.status(201).json(
			customResponse({
				data: null,
				success: true,
				error: false,
				message: `Auth Signup is success. An Email with Verification link has been sent to your account ${user.email} Please Verify Your Email first or use the email verification lik which is been send with the response body to verfiy your email`,
				status: 201,
			}),
		)
	} catch (error) {
		return next(createHttpError.InternalServerError)
	}
}

module.exports.loginService = async (req, res, next) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') })
			.select('+password')
			.exec()

		// 401 Unauthorized
		if (!user) {
			return next(createHttpError(401, 'Auth Failed (Invalid Credentials)'))
		}

		const { password: pass, confirmPassword, ...otherUserInfo } = user._doc

		const data = {
			user: otherUserInfo,
		}

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: 'Auth logged in successful.',
				status: 200,
				data,
			}),
    )

	} catch (error) {
		return next(error)
	}
}
