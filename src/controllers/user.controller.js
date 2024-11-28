const {
	getUserPendingRequestsService,
	getUserMatchConnectionsService,
} = require('../services/user.service')

module.exports.getUserPendingRequestsController = (req, res, next) =>
	getUserPendingRequestsService(req, res, next)

module.exports.getUserMatchConnectionsController = (req, res, next) =>
	getUserMatchConnectionsService(req, res, next)
