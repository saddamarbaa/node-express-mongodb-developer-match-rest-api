const {
	sendConnectionRequestService,
	reviewConnectionRequestService,
} = require('../services/connectionRequest.service')

module.exports.sendConnectionRequestController = (req, res, next) =>
	sendConnectionRequestService(req, res, next)

module.exports.reviewConnectionRequestController = (req, res, next) =>
	reviewConnectionRequestService(req, res, next)
