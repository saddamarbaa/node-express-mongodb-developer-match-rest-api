const mongoose = require('mongoose')

const { Chat } = require('../models/chat.model')
const { customResponse } = require('../utils')

module.exports.getChatMessagesService = async (req, res, next) => {
	try {
		const { userId, otherUserId } = req.params

		// ✅ Validate presence
		if (!userId || !otherUserId) {
			return res.status(400).send(
				customResponse({
					success: false,
					error: true,
					message: 'Both userId and otherUserId are required.',
					status: 400,
					data: null,
				}),
			)
		}

		const participants = [
			new mongoose.Types.ObjectId(userId),
			new mongoose.Types.ObjectId(otherUserId),
		]

		const chat = await Chat.findOne({
			participants: { $all: participants },
		}).populate(
			'messages.senderId',
			'skills profileUrl username email  firstName lastName bio gender 	createdAt 	updatedAt',
		)

		// ✅ If no chat yet, return empty messages
		if (!chat) {
			return res.status(200).send(
				customResponse({
					success: true,
					error: false,
					message: 'No chat found. Starting new conversation.',
					status: 200,
					data: {
						messages: [],
					},
				}),
			)
		}

		// ✅ Chat exists
		return res.status(200).send(
			customResponse({
				success: true,
				error: false,
				message: 'Chat retrieved successfully.',
				status: 200,
				data: {
					messages: chat.messages,
					chatId: chat._id,
				},
			}),
		)
	} catch (error) {
		next(error)
	}
}
