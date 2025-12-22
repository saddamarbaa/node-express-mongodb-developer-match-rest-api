const createHttpError = require('http-errors')
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
