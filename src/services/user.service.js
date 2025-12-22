const ConnectionRequest = require('../models/connectionRequest.model')
const User = require('../models/User.model')
const { customResponse } = require('../utils')

module.exports.getUserPendingRequestsService = async (req, res, next) => {
	try {
		const loginUserId = req.user._id

		const connectionRequests = await ConnectionRequest.find({
			toUserId: loginUserId,
			status: 'interested',
		}).populate(
			'fromUserId',
			'skills profileUrl username email isEmailVerified firstName lastName bio gender 	createdAt 	updatedAt ',
		)

		const message =
			connectionRequests.length === 0
				? 'No pending connection requests found.'
				: 'Pending connection requests retrieved successfully.'

		const statusCode = 200

		return res.status(statusCode).json(
			customResponse({
				success: true,
				error: false,
				message: message,
				status: statusCode,
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
			.populate(
				'fromUserId',
				'skills profileUrl username email isEmailVerified firstName lastName bio gender 	createdAt 	updatedAt ',
			) // Populate sender's info
			.populate(
				'toUserId',
				'skills profileUrl username email isEmailVerified firstName lastName bio gender 	createdAt 	updatedAt ',
			) // Populate receiver's info

		// Extract user data from the connections
		const matchedUsers = userConnections.map((connection) => {
			// Return the user who is not the logged-in user
			if (connection.fromUserId._id.toString() === loginUserId.toString()) {
				return connection.toUserId
			} else {
				return connection.fromUserId
			}
		})

		const message =
			userConnections.length === 0
				? 'No connections found.'
				: 'User connections retrieved successfully.'

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: message,
				status: 200,
				data: matchedUsers,
			}),
		)
	} catch (error) {
		return next(error)
	}
}

module.exports.getUserFeedService = async (req, res, next) => {
	try {
		const currentUserId = req.user._id

		// Get pagination params from query, default values
		let page = Number(req.query.page) || 1
		let limit = Number(req.query.limit) || 20

		// Ensure limit does not exceed 100
		if (limit > 100) {
			limit = 100
		}

		const startIndex = (page - 1) * limit
		const endIndex = page * limit

		// Step 1: Fetch all connection requests involving the current user (either as sender or receiver)
		const userConnections = await ConnectionRequest.find({
			$or: [{ fromUserId: currentUserId }, { toUserId: currentUserId }],
		}).select('fromUserId toUserId status')

		// Step 2: Collect IDs of users to be excluded from the feed
		const excludedUserIds = new Set()
		excludedUserIds.add(currentUserId.toString()) // Exclude current user's own profile

		// Add users from connections and requests (accepted, ignored, pending)
		userConnections.forEach((connection) => {
			if (['accepted', 'ignored', 'pending'].includes(connection.status)) {
				excludedUserIds.add(connection.fromUserId.toString())
				excludedUserIds.add(connection.toUserId.toString())
			}
		})

		// Step 3: Query to find users that are NOT in the excludedUserIds set, applying pagination
		const totalUsersCount = await User.countDocuments({
			// Exclude users from the feed based on the excludedUserIds
			_id: { $nin: Array.from(excludedUserIds) },
		})

		// Handle if requested page doesn't exist
		if (page > 1 && page > Math.ceil(totalUsersCount / limit)) {
			return res.status(400).json(
				customResponse({
					success: false,
					error: true,
					message: `Page ${page} does not exist. Total pages: ${Math.ceil(
						totalUsersCount / limit,
					)}.`,
					status: 400,
					data: null,
				}),
			)
		}

		const usersToShow = await User.find({
			_id: { $nin: Array.from(excludedUserIds) },
		})
			.select(
				'skills profileUrl username email isEmailVerified firstName lastName bio gender 	createdAt 	updatedAt ',
			)
			.limit(limit)
			.skip(startIndex)

		// Pagination response details
		const pagination = {
			currentPage: page,
			limit: limit,
			totalDocs: totalUsersCount,
			totalPages: Math.ceil(totalUsersCount / limit),
			nextPage: endIndex < totalUsersCount ? page + 1 : null,
			prevPage: startIndex > 0 ? page - 1 : null,
			lastPage: Math.ceil(totalUsersCount / limit),
		}

		const message =
			usersToShow.length === 0
				? 'No users found for your feed.'
				: 'User feed loaded successfully.'

		const data = {
			users: usersToShow,
			pagination: pagination,
		}

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: message,
				status: 200,
				data: data,
			}),
		)
	} catch (error) {
		return next(error)
	}
}

module.exports.getUserRejectedConnectionsService = async (req, res, next) => {
	try {
		const loginUserId = req.user._id

		// Find rejected (ignored) connection requests by the logged-in user
		const rejectedConnections = await ConnectionRequest.find({
			fromUserId: loginUserId,
			status: 'ignored',
		}).populate(
			'toUserId',
			'skills profileUrl username email isEmailVerified firstName lastName bio gender createdAt updatedAt',
		)

		const rejectedUsers = rejectedConnections.map(
			(connection) => connection.toUserId,
		)

		const message =
			rejectedUsers.length === 0
				? 'No rejected users found.'
				: 'Rejected users retrieved successfully.'

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message,
				status: 200,
				data: rejectedUsers,
			}),
		)
	} catch (error) {
		return next(error)
	}
}

module.exports.deleteUserService = async (req, res, next) => {
	try {
		const userId = req.user._id

		// Remove connection requests where the user is either the sender or receiver
		await ConnectionRequest.deleteMany({
			$or: [{ fromUserId: userId }, { toUserId: userId }],
		})

		// Delete the user
		await User.findByIdAndDelete(userId)

		return res.status(200).json(
			customResponse({
				success: true,
				error: false,
				message: 'User profile deleted successfully.',
				status: 200,
				data: null,
			}),
		)
	} catch (error) {
		return next(error)
	}
}
