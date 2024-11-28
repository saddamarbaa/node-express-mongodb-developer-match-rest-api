const { getUserPendingRequestsService} = require("../services/user.service");

module.exports.getUserPendingRequestsController = (req, res, next) =>
	getUserPendingRequestsService(req, res, next)
