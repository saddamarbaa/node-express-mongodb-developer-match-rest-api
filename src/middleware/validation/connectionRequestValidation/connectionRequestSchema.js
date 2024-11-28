const Joi = require('joi')
const { CONNECTION_STATUSES } = require('../../../constants/connectionRequest')
const JoiObjectId = require('joi-objectid')(Joi)

const connectionRequestSchema = Joi.object({
	status: Joi.string()
		.valid(...CONNECTION_STATUSES)
		.required()
		.messages({
			'any.only': `Status must be one of ${CONNECTION_STATUSES.join(', ')}`,
			'any.required': 'Status is required',
		}),
	toUserId: JoiObjectId().required().messages({
		'string.pattern.name': 'Invalid user ID format',
		'any.required': 'User ID is required',
	}),
})

module.exports = { connectionRequestSchema }
