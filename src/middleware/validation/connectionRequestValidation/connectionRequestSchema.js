const Joi = require('joi')
const { CONNECTION_STATUSES } = require('../../../constants/connectionRequest')

const JoiObjectId = require('joi-objectid')(Joi)


const connectionRequestSchema = {
	sendConnectionRequest: Joi.object({
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
	}),
	reviewConnectionRequest: Joi.object({
		status: Joi.string()
			.valid(...CONNECTION_STATUSES)
			.required()
			.messages({
				'any.only': `Status must be one of ${CONNECTION_STATUSES.join(', ')}`,
				'any.required': 'Status is required',
			}),
		requestId: JoiObjectId().required().messages({
			'string.pattern.name': 'Invalid request ID format',
			'any.required': 'Request ID is required',
		}),
	}),
}

module.exports = { connectionRequestSchema }
