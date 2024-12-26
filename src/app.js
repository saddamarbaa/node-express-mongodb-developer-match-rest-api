const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const dotenv = require('dotenv-safe')
const cors = require('cors')
const helmet = require('helmet')

const api = require('./api')
const { notFoundMiddleware, errorHandlerMiddleware } = require('./middleware')

const app = express()

// Enable CORS with credentials (allowing all origins)
const corsConfig = {
	origin: true,
	credentials: true,
}

app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
	helmet({
		crossOriginResourcePolicy: false,
		crossOriginEmbedderPolicy: false,
		crossOriginOpenerPolicy: false,
	}),
)

// Access Environment variables
dotenv.config()

// Routes which Should handle the requests
app.use('/api/v1', api)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
