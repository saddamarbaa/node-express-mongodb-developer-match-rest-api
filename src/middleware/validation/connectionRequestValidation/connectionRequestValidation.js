const validator = require('../validator')
const { connectionRequestSchema } = require('./connectionRequestSchema')

const sendConnectionRequestValidation = (req, res, next) => {
	validator(connectionRequestSchema.sendConnectionRequest, req.params, next)
}


const reviewConnectionRequestValidation = (req, res, next) => {
	validator(connectionRequestSchema.reviewConnectionRequest, req.params, next)
}

module.exports = {
	sendConnectionRequestValidation,
	reviewConnectionRequestValidation
}
