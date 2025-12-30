const { getChatMessagesService } = require('../services/chat.service')

module.exports.getChatMessagesController = (req, res, next) =>
	getChatMessagesService(req, res, next)
