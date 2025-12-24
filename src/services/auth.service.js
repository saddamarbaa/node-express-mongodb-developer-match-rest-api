const createHttpError = require('http-errors')
const crypto = require('crypto')
const User = require('../models/User.model')
const { customResponse, generateJwtToken } = require('../utils')
const { environmentConfig } = require('../config')

module.exports.signupService = async (req, res, next) => {
	const {
		email,
		password,
		firstName,
		lastName,
		confirmPassword,
		gender,
		skills,
		bio,
	} = req.body

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
			skills: skills ? skills : [],
			...User(bio && { bio: bio }),
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
		return next(error)
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

		// Compare password
		const isPasswordCorrect = await user.comparePassword(password)

		if (!isPasswordCorrect) {
			return next(createHttpError(401, 'Auth Failed (Invalid Credentials)'))
		}

		const generatedToken = await generateJwtToken(
			{
				userId: user._id,
			},
			environmentConfig.JWT_TOKEN_SECRET,
			{
				expiresIn: environmentConfig.JWT_EXPIRE_TIME,
				issuer: environmentConfig.JWT_ISSUER,
				audience: String(user._id),
			},
		)

		const { password: pass, confirmPassword, ...otherUserInfo } = user._doc

		// Response data
		const data = {
			user: {
				authToken: generatedToken,
				user: otherUserInfo,
			},
		}

		// Set cookies
		res.cookie('authToken', generatedToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // one days
			secure: process.env.NODE_ENV === 'production',
		})

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

module.exports.getAuthProfileService = async (req, res, next) => {
	try {
		const user = await User.findById(req.user?._id)
			.select('-password -confirmPassword  -acceptTerms ')
			.exec()

		if (!user) {
			return next(createHttpError(401, `Auth Failed `))
		}

		const {
			password: pass,
			confirmPassword,
			acceptTerms,
			...otherUserInfo
		} = user._doc

		return res.status(200).send(
			customResponse({
				success: true,
				error: false,
				message: 'Successfully found user profile 🍀',
				status: 200,
				data: { user: otherUserInfo },
			}),
		)
	} catch (error) {
		return next(InternalServerError)
	}
}

module.exports.logoutService = async (req, res, next) => {
	try {
		const token =
			req.cookies.authToken || req.headers['authorization']?.split(' ')[1]

		if (token) {
			// TODO (Add the token to the blacklist)
			// jwtBlacklist.add(token)
		}

		// Clear the auth cookie
		res.cookie('authToken', '', {
			httpOnly: true,
			expires: new Date(0),
			secure: process.env.NODE_ENV === 'production',
		})

		return res.status(200).send(
			customResponse({
				success: true,
				error: false,
				message: 'Successfully logged out 😏 🍀',
				status: 200,
				data: null,
			}),
		)
	} catch (error) {
		return next(error)
	}
}

module.exports.updateProfileService = async (req, res, next) => {
	const { firstName, lastName, email, gender, bio, skills, profileUrl } =
		req.body

	try {
		const user = await User.findById(req.params.userId)

		if (!user) {
			return next(new createHttpError.BadRequest())
		}

		if (!req.user?._id.equals(user._id)) {
			return next(createHttpError(403, `Auth Failed (Unauthorized)`))
		}

		if (email) {
			const existingUser = await User.findOne({
				email: new RegExp(`^${email}$`, 'i'),
			})
			if (existingUser && !existingUser._id.equals(user._id)) {
				return next(
					createHttpError(
						422,
						`E-Mail address ${email} is already exists, please pick a different one.`,
					),
				)
			}
		}

		user.firstName = firstName || user.firstName
		user.lastName = lastName || user.lastName
		user.email = email || user.email
		user.gender = gender || user.gender
		user.bio = bio || user.bio
		user.skills = skills || user.skills
		user.profileUrl = profileUrl || user.profileUrl

		const updatedUser = await user.save({
			validateBeforeSave: false,
			new: true,
		})

		if (!updatedUser) {
			return next(
				createHttpError(
					422,
					`Failed to update user by given ID ${req.params.userId}`,
				),
			)
		}

		const {
			password: pass,
			confirmPassword,
			...otherUserInfo
		} = updatedUser._doc

		return res.status(200).send(
			customResponse({
				success: true,
				error: false,
				message: `Successfully updated user by ID: ${req.params.userId}`,
				status: 200,
				data: { user: otherUserInfo },
			}),
		)
	} catch (error) {
		return next(error)
	}
}

module.exports.forgotPasswordService = async (req, res, next) => {
	const { email } = req.body
	try {
		const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') })

		if (!user) {
			const message = `The email address ${email} is not associated with any account. Double-check your email address and try again.`
			return next(createHttpError(401, message))
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString('hex')
		const resetPasswordToken = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex')
		const resetPasswordExpire = Date.now() + 30 * 60 * 1000 // 30 minutes

		// Save the hashed token and expiry to the user
		user.resetPasswordToken = resetPasswordToken
		user.resetPasswordExpire = resetPasswordExpire
		await user.save({ validateBeforeSave: false })

		const WEBSITE_URL = environmentConfig.CLIENT_URL

		const passwordResetEmailLink = `${WEBSITE_URL}/auth?id=${user._id}&token=${resetPasswordToken}`

		// Email message
		const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${passwordResetEmailLink}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`

		// Send email
		// TODO
		// await sendEmail({
		// 	to: user.email,
		// 	subject: 'Password Reset Request',
		// 	text: message,
		// })

		// Response data
		const data = {
			user: {
				resetPasswordToken: passwordResetEmailLink,
			},
		}

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: `An email has been sent to ${user.email} with further instructions.`,
				status: 200,
				data,
			}),
		)
	} catch (error) {
		return next(error)
	}
}

module.exports.resetPasswordService = async (req, res, next) => {
	const { password, confirmPassword } = req.body

	const token = req.params.token
	const userId = req.params.userId

	try {
		// Hash the token from the request to compare with the stored hashed token
		const resetPasswordToken = crypto
			.createHash('sha256')
			.update(token)
			.digest('hex')

		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() }, // Check if the token is not expired
		})

		if (!user) {
			return next(
				createHttpError(400, 'Invalid or expired password reset token'),
			)
		}

		// Update the user's password and clear the reset token and expiry
		user.password = password
		user.confirmPassword = confirmPassword
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		await user.save() // We want validation for password and confirmPassword

		// Optionally, send an email notifying the user that the password has been reset

		return res.status(200).send(
			customResponse({
				success: true,
				error: false,
				message: `Your password has been Password Reset Successfully updated please login`,
				status: 200,
				data: null,
			}),
		)
	} catch (error) {
		return next(InternalServerError)
	}
}
