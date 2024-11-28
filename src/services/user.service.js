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
