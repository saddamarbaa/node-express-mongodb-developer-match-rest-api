const { Server } = require('socket.io')

let io
const onlineUsers = new Map() // userId -> socketId

const initSocket = (server) => {
	io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	})

	io.on('connection', (socket) => {
		console.log('🔌 Socket connected:', socket.id)

		// Register user
		socket.on('register', (userId) => {
			onlineUsers.set(userId, socket.id)
			console.log(`👤 User ${userId} online`)
		})

		// Join chat room
		socket.on('joinChatRoom', ({ name, userId, targetUserId }) => {
			const roomId = [userId, targetUserId].sort().join('_')
			console.log(
				`📦 Joined room: ${name} by user ${userId} in the room by number ${roomId}`,
			)
			socket.join(roomId)
		})

		// Handle messages
		socket.on('sendMessage', ({ roomId, message }) => {
			console.log(`💬 Message in room ${roomId}:`, message)
			io.to(roomId).emit('receiveMessage', message)
		})

		socket.on('disconnect', () => {
			for (const [userId, socketId] of onlineUsers.entries()) {
				if (socketId === socket.id) {
					onlineUsers.delete(userId)
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
