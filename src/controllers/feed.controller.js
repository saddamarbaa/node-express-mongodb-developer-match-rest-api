const { getUsersService } = require("../services/feed.service");

module.exports.getUsersController = (req, res, next) =>
	getUsersService(req, res, next)
