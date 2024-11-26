const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv-safe')

const api = require('./api')
const { notFoundMiddleware, errorHandlerMiddleware } = require('./middleware')

const app = express()

// Middleware to parse incoming JSON
app.use(express.json())

// Access Environment variables
dotenv.config()

// Routes which Should handle the requests
app.use('/api/v1', api)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
