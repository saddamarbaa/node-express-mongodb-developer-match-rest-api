const ConnectionRequest = require('../models/connectionRequest.model')
const { customResponse } = require('../utils')

module.exports.getUserPendingRequestsService = async (req, res, next) => {
	try {
		const loginUserId = req.user._id

		const connectionRequests = await ConnectionRequest.find({
			toUserId: loginUserId,
			status: 'interested',
		}).populate('fromUserId', 'firstName lastName profileUrl')

		const message =
			connectionRequests.length === 0
				? 'No pending connection requests found.'
				: 'Pending connection requests retrieved successfully.'

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: message,
				status: 200,
				data: connectionRequests,
			}),
		)
	} catch (error) {
		return next(error)
	}
}

module.exports.getUserMatchConnectionsService = async (req, res, next) => {
	try {
		const loginUserId = req.user._id

		// Find all connections where the user is either the sender or receiver, and the status is "accepted"
		const userConnections = await ConnectionRequest.find({
			$or: [
				{ fromUserId: loginUserId, status: 'accepted' },
				{ toUserId: loginUserId, status: 'accepted' },
			],
		})
			.populate('fromUserId', 'firstName lastName profileUrl') // Populate sender's info
			.populate('toUserId', 'firstName lastName profileUrl') // Populate receiver's info

			.populate('fromUserId', 'firstName lastName profileUrl')

		const message =
			userConnections.length === 0
				? 'No connections found.'
				: 'User connections retrieved successfully.'

		return res.status(userConnections.length === 0 ? 204 : 200).json(
			customResponse({
				success: true,
				error: false,
				message: message,
				status: userConnections.length === 0 ? 204 : 200,
				data: userConnections,
			}),
		)
	} catch (error) {
		return next(error)
	}
}
