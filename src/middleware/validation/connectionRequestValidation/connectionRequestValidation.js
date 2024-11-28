const validator = require('../validator')
const { connectionRequestSchema } = require('./connectionRequestSchema')

const sendConnectionRequestValidation = (req, res, next) => {
	validator(connectionRequestSchema, req.params, next)
}

module.exports = {
	sendConnectionRequestValidation,
}
