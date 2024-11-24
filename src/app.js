const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3000

// Middleware to parse incoming JSON
app.use(express.json())

app.use('/test', (req, res) => {
	res.send('Test api')
})

app.use('*', (req, res) => {
	res.send('any route')
})

app.listen(port, () => {
	console.log('app is listening in port ' + port)
})
