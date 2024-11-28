const createHttpError = require('http-errors')

const User = require('../models/User.model')
const { customResponse } = require('../utils')
const ConnectionRequest = require('../models/connectionRequest.model')

module.exports.sendConnectionRequestService = async (req, res, next) => {
	try {
		const fromUserID = req.user._id
		const toUserId = req.params.toUserId
		const status = req.params.status

		// Ensure the user is not sending a request to themselves
		if (fromUserID.toString() === toUserId) {
			return next(
				createHttpError(
					400,
					'You cannot send a connection request to yourself.',
				),
			)
		}

		// Check if the `toUserId` exists in the database
		const recipientUser = await User.findById(toUserId)
		if (!recipientUser) {
			return next(
				createHttpError(
					404,
					'The user you are trying to connect with does not exist.',
				),
			)
		}

		// Check if there's already a connection request between `fromUserId` and `toUserId`
		const existingRequest = await ConnectionRequest.findOne({
			$or: [
				{ fromUserId: fromUserID, toUserId: toUserId },
				{ fromUserId: toUserId, toUserId: fromUserID },
			],
		})

		if (existingRequest) {
			return next(
				createHttpError(
					400,
					'A connection request between these users already exists.',
				),
			)
		}

		// Create a new connection request
		const newConnectionRequest = new ConnectionRequest({
			fromUserId: fromUserID,
			toUserId: toUserId,
			status: status,
		})

		const connectionRequest = await newConnectionRequest.save()

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: 'Connection request sent successfully.',
				status: 200,
				data: connectionRequest,
			}),
		)
	} catch (error) {
		return next(error)
	}
}
