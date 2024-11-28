const createHttpError = require('http-errors')

const User = require('../models/User.model')
const { customResponse } = require('../utils')
const ConnectionRequest = require('../models/connectionRequest.model')

module.exports.sendConnectionRequestService = async (req, res, next) => {
	try {
		const fromUserID = req.user._id
		const { toUserId, status } = req.params

		// Ensure the user is not sending a request to themselves
		if (fromUserID.toString() === toUserId) {
			return next(
				createHttpError(
					400,
					'You cannot send a connection request to yourself.',
				),
			)
		}

		const validStatuses = ['ignore', 'interested']

		if (!validStatuses.includes(status)) {
			return next(
				createHttpError(
					400,
					'Invalid status provided. Valid statuses are "interested" or "ignore".',
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
			// Ensure the request is between these two users exactly and exclude other statuses
			// status: { $in: ['pending', 'interested', 'accepted'] },
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

module.exports.reviewConnectionRequestService = async (req, res, next) => {
	try {
		const loginUserId = req.user._id
		const { requestId, status } = req.params

		const validStatuses = ['accepted', 'rejected']

		if (!validStatuses.includes(status)) {
			return next(
				createHttpError(
					400,
					'Invalid status provided. Valid statuses are "rejected" or "accepted".',
				),
			)
		}

		const connectionRequest = await ConnectionRequest.findOne({
			_id: requestId,
			status: 'interested',
			toUserId: loginUserId,
		})

		if (!connectionRequest) {
			return next(
				createHttpError(
					404,
					'Connection request not found or already reviewed.',
				),
			)
		}

		connectionRequest.status = status
		const updatedConnectionRequest = await connectionRequest.save()

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: `Connection request successfully ${status}.`,
				status: 200,
				data: updatedConnectionRequest,
			}),
		)
	} catch (error) {
		return next(error)
	}
}
