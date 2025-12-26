const app = require('./app')
const { environmentConfig } = require('./config')
const { connectDB } = require('./config/db.config')
const http = require('http')
const { initSocket } = require('./socket')

const PORT = process.env.PORT || 5001

// Create HTTP server
const server = http.createServer(app)

// Init socket
initSocket(server)

// Start server
const startServer = async () => {
	try {
		const env = process.env.NODE_ENV

		await connectDB(
			env === 'testing'
				? environmentConfig.TEST_ENV_MONGODB_CONNECTION_STRING
				: environmentConfig.MONGODB_CONNECTION_STRING,
		)

		console.log('MongoDB connected')

		server.listen(PORT, () => {
			console.log(`🚀 Server running at http://localhost:${PORT}`)
		})
	} catch (error) {
		console.error('Startup error:', error)
	}
}

startServer()

module.exports = app
