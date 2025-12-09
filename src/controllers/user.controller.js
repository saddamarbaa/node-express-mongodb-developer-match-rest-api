const {
	getUserPendingRequestsService,
	getUserMatchConnectionsService,
	getUserFeedService,
	deleteUserService,
} = require('../services/user.service')

module.exports.getUserPendingRequestsController = (req, res, next) =>
	getUserPendingRequestsService(req, res, next)

module.exports.getUserMatchConnectionsController = (req, res, next) =>
	getUserMatchConnectionsService(req, res, next)

module.exports.getUserFeedController = (req, res, next) =>
	getUserFeedService(req, res, next)

module.exports.deleteUserController = (req, res, next) =>
	deleteUserService(req, res, next)
