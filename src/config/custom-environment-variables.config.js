const dotenv = require('dotenv-safe')

dotenv.config()

const environmentConfig = {
	MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
	TEST_ENV_MONGODB_CONNECTION_STRING:
		process.env.TEST_ENV_MONGODB_CONNECTION_STRING,
	API_URL: process.env.API_URL,
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	API_VERSION: process.env.API_VERSION,
	JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
	JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
	JWT_ISSUER: process.env.JWT_ISSUER,
	CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:8080',
}

module.exports = environmentConfig
