const dotenv = require('dotenv-safe')

dotenv.config()

const environmentConfig = {
	MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
	TEST_ENV_MONGODB_CONNECTION_STRING:
		process.env.TEST_ENV_MONGODB_CONNECTION_STRING,
	API_URL: process.env.API_URL,
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
}

module.exports =  environmentConfig 
