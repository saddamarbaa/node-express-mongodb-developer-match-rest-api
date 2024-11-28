const sendConnectionRequestSchema = require('./connectionRequestSchema')
const {
	reviewConnectionRequestValidation,
	sendConnectionRequestValidation,
} = require('./connectionRequestValidation')

module.exports = {
	...sendConnectionRequestSchema,
	sendConnectionRequestValidation,
	reviewConnectionRequestValidation,
}
