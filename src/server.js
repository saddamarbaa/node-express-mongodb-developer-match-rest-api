const app = require('./app')
const { environmentConfig } = require('./config')
const { connectDB } = require('./config/db.config')

const PORT = process.env.PORT || 5001

// Connecting to MongoDB and Starting Server
const startServer = async () => {
	try {
		// env setup
		const env = process.env.NODE_ENV
		const conn = await connectDB(
			env === 'testing'
				? environmentConfig.TEST_ENV_MONGODB_CONNECTION_STRING
				: environmentConfig.MONGODB_CONNECTION_STRING,
		)

		console.log(`MongoDB database connection established successfully`)

		app?.listen(PORT, () => {
			console.log(`Server is listening on port: http://localhost:${PORT} ....`)
		})
	} catch (error) {
		console.log(
			'MongoDB connection error. Please make sure MongoDB is running: ',
		)
	}
}

// Establish http server connection
startServer()

module.exports = app
