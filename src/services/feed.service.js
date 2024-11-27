const User = require('../models/User.model')
const { customResponse } = require('../utils')

module.exports.getUsersService = async (req, res, next) => {
	try {
		const results = await User.find()
		const users = results?.map((userDoc) => ({
			...userDoc._doc,
		}))

		const message =
			users.length === 0
				? 'No users found in the database.'
				: 'Users successfully retrieved.'

		const responseObject = {
			users: users,
		}

		return res.status(200).send(
			customResponse({
				success: true,
				error: false,
				message: message,
				status: 200,
				data: responseObject,
			}),
		)
	} catch (error) {
		return next(error)
	}
}
