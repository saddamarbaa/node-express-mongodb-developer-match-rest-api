const { default: mongoose } = require('mongoose')
const { Server } = require('socket.io')
const { Chat } = require('../models/chat.model')

let io

// userId -> socketId
const onlineUsers = new Map()

const initSocket = (server) => {
	io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	})

	io.on('connection', (socket) => {
		console.log('🔌 Socket connected:', socket.id)

		/* ===============================
		   REGISTER USER (ONLINE STATUS)
		================================ */
		socket.on('register', (userId) => {
			onlineUsers.set(userId, socket.id)

			// broadcast to everyone
			io.emit('userOnline', userId)

			console.log(`👤 User ${userId} online`)
		})

		/* ===============================
		   CHECK USER ONLINE STATUS
		   (CRITICAL FIX)
		================================ */
		socket.on('checkUserOnline', (userId) => {
			socket.emit('userOnlineStatus', {
				userId,
				isOnline: onlineUsers.has(userId),
			})
		})

		/* ===============================
		   JOIN CHAT ROOM
		================================ */
		socket.on('joinChatRoom', ({ userId, targetUserId }) => {
			const roomId = [userId, targetUserId].sort().join('_')
			socket.join(roomId)

			console.log(`📦 Joined room ${roomId}`)
		})

		/* ===============================
		   SEND MESSAGE
		================================ */
		socket.on('sendMessage', async ({ roomId, message }) => {
			try {
				const participants = roomId
					.split('_')
					.map((id) => new mongoose.Types.ObjectId(id))

				let chat = await Chat.findOne({
					participants: { $all: participants },
				})

				if (!chat) {
					chat = await Chat.create({
						participants,
						messages: [],
					})
				}

				const newMessage = {
					senderId: message.senderId,
					text: message.text,
					readBy: [message.senderId],
					reactions: {},
				}

				chat.messages.push(newMessage)
				await chat.save()

				const savedMessage = chat.messages[chat.messages.length - 1]

				io.to(roomId).emit('receiveMessage', {
					id: savedMessage._id,
					text: savedMessage.text,
					senderId: savedMessage.senderId.toString(),
					readBy: savedMessage.readBy,
					reactions: savedMessage.reactions,
					timestamp: savedMessage.createdAt,
				})
			} catch (err) {
				console.error('❌ Message error:', err)
			}
		})

		/* ===============================
		   TYPING INDICATORS
		================================ */
		socket.on('typing', ({ roomId, userId }) => {
			socket.to(roomId).emit('typing', { userId })
		})

		socket.on('stopTyping', ({ roomId, userId }) => {
			socket.to(roomId).emit('stopTyping', { userId })
		})

		/* ===============================
		   READ RECEIPTS ✔✔
		================================ */
		socket.on('readMessage', async ({ roomId, messageId, userId }) => {
			try {
				const participants = roomId
					.split('_')
					.map((id) => new mongoose.Types.ObjectId(id))

				const chat = await Chat.findOne({
					participants: { $all: participants },
					'messages._id': messageId,
				})

				if (!chat) return

				const msg = chat.messages.id(messageId)

				if (!msg.readBy.includes(userId)) {
					msg.readBy.push(userId)
					await chat.save()
				}

				io.to(roomId).emit('messageRead', {
					messageId,
					userId,
				})
			} catch (err) {
				console.error('❌ Read receipt error:', err)
			}
		})

		/* ===============================
		   MESSAGE REACTIONS ❤️🔥😂
		================================ */
		socket.on('reactMessage', async ({ roomId, messageId, emoji, userId }) => {
			try {
				const participants = roomId
					.split('_')
					.map((id) => new mongoose.Types.ObjectId(id))

				const chat = await Chat.findOne({
					participants: { $all: participants },
					'messages._id': messageId,
				})

				if (!chat) return

				const msg = chat.messages.id(messageId)

				if (!msg.reactions) msg.reactions = {}
				if (!msg.reactions[emoji]) msg.reactions[emoji] = []

				// toggle reaction
				if (msg.reactions[emoji].includes(userId)) {
					msg.reactions[emoji] = msg.reactions[emoji].filter(
						(id) => id !== userId,
					)
				} else {
					msg.reactions[emoji].push(userId)
				}

				await chat.save()

				io.to(roomId).emit('messageReaction', {
					messageId,
					emoji,
					userId,
				})
			} catch (err) {
				console.error('❌ Reaction error:', err)
			}
		})

		/* ===============================
		   DISCONNECT (OFFLINE STATUS)
		================================ */
		socket.on('disconnect', () => {
			for (const [userId, socketId] of onlineUsers.entries()) {
				if (socketId === socket.id) {
					onlineUsers.delete(userId)

					io.emit('userOffline', userId)
					break
				}
			}

			console.log('❌ Socket disconnected:', socket.id)
		})
	})

	return io
}

const getIO = () => {
	if (!io) {
		throw new Error('Socket.io not initialized')
	}
	return io
}

module.exports = { initSocket, getIO }
