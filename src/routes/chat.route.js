const express = require('express')
const chatRouter = express.Router()

const { checkIsAuth } = require('../middleware')
const { getChatMessagesController } = require('../controllers/chat.controller')

/**
 * GET chat between two users
 * GET /api/chats/:userId/:otherUserId
 */
chatRouter.get('/:userId/:otherUserId', checkIsAuth, getChatMessagesController)

module.exports = chatRouter
