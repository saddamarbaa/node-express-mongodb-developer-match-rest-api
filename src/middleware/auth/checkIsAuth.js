const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

const { environmentConfig } = require('../../config')
const User = require('../../models/User.model')

module.exports = async function checkIsAuth(req, res, next) {
	const authHeader =
		(req && req.headers.authorization) || (req && req.headers.Authorization)
	const token =
		(authHeader && authHeader.split(' ')[1]) ||
		req?.cookies?.authToken ||
		req?.cookies?.accessToken ||
		''

	if (!token) {
		return next(createHttpError(401, 'Auth Failed (Invalid Credentials)'))
	}

	jwt.verify(
		token,
		environmentConfig.JWT_TOKEN_SECRET,
		async (err, decodedUser) => {
			if (err) {
				// JsonWebTokenError or token has expired
				const errorMessage =
					err.name === 'JsonWebTokenError'
						? 'Auth Failed (Unauthorized)'
						: err.message

				return next(createHttpError(403, errorMessage))
			}

			try {
				const decodedUserInDB = await User.findOne({
					_id: decodedUser?.userId,
				}).select('-password -confirmPassword')

				if (!decodedUserInDB) {
					return next(createHttpError(403, `Auth Failed (Unauthorized)`))
				}
				// console.log('The Authorized Admin is ', user);
				// req.user = user as IUser;
				req.user = decodedUserInDB

				// if we did success go to the next middleware
				next()
			} catch (error) {
				return next(InternalServerError)
			}
		},
	)
}
