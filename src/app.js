const express = require('express')
const morgan = require('morgan')

const {
	checkIsAdmin,
	notFoundMiddleware,
	errorHandlerMiddleware,
	checkIsAuth,
} = require('./middleware')

const app = express()
const PORT = process.env.PORT || 5001

// Middleware to parse incoming JSON
app.use(express.json())

app.use('/', (req, res, next) => {
	req.user = {
		name: 'test',
		isAdmin: true,
		token: 123,
	}

	next()
})

app.use('/admin', checkIsAuth, checkIsAdmin, (req, res) => {
	res.send('admin api')
})

app.post('/user/:userID/:userName/:pass', checkIsAuth, (req, res) => {
	console.log(req.params)
	res.send('user  params')
})

app.post('/user', checkIsAuth, (req, res) => {
	console.log(req.query)
	res.status(200).send('user data')
})

app.delete('/user', (req, res) => {
	res.status(400).send('deleted user data')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
