const createHttpError = require('http-errors')

const User = require('../models/User.model')
const { customResponse } = require('../utils')
const ConnectionRequest = require('../models/connectionRequest.model')

module.exports.sendConnectionRequestService = async (req, res, next) => {
	try {
		const loginUserId = req.user._id
		const { toUserId, status } = req.params

		// Prevent self-request
		if (loginUserId.toString() === toUserId) {
			return next(
				createHttpError(
					400,
					'You cannot send a connection request to yourself.',
				),
			)
		}

		// Validate status
		const validStatuses = ['ignored', 'interested']
		if (!validStatuses.includes(status)) {
			return next(
				createHttpError(400, 'Invalid status. Use "interested" or "ignored".'),
			)
		}

		// Check recipient exists
		const recipientUser = await User.findById(toUserId)
		if (!recipientUser) {
			return next(
				createHttpError(
					404,
					'The user you are trying to connect with does not exist.',
				),
			)
		}

		// Check existing connection (either direction)
		const existingRequest = await ConnectionRequest.findOne({
			$or: [
				{ fromUserId: loginUserId, toUserId },
				{ fromUserId: toUserId, toUserId: loginUserId },
			],
		})

		// If exists → update (allows retry after ignore)
		if (existingRequest) {
			existingRequest.fromUserId = loginUserId
			existingRequest.toUserId = toUserId
			existingRequest.status = status

			await existingRequest.save()

			return res.status(200).json(
				customResponse({
					success: true,
					error: false,
					message: 'Connection request updated successfully.',
					status: 200,
					data: existingRequest,
				}),
			)
		}

		// Create new request
		const connectionRequest = await ConnectionRequest.create({
			fromUserId: loginUserId,
			toUserId,
			status,
		})

		return res.status(201).json(
			customResponse({
				success: true,
				error: false,
				message: 'Connection request sent successfully.',
				status: 201,
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
