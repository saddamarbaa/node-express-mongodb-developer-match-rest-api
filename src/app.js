const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const dotenv = require('dotenv-safe')
const cors = require('cors')

const api = require('./api')
const { notFoundMiddleware, errorHandlerMiddleware } = require('./middleware')

const app = express()

// Enable CORS with credentials (allowing all origins)
app.use(
	cors({
		origin: true,
		credentials: true,
	}),
)

app.use(express.json())
app.use(cookieParser())

// Access Environment variables
dotenv.config()

// Routes which Should handle the requests
app.use('/api/v1', api)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
