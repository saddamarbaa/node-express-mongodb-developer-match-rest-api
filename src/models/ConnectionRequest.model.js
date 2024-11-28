const mongoose = require('mongoose')
const { CONNECTION_STATUSES } = require('../constants/connectionRequest')

const connectionRequestSchema = new mongoose.Schema(
	{
		fromUserId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User', // reference to user collection
		},
		toUserId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: {
				values: [...CONNECTION_STATUSES],
				message: '{VALUE} is not a valid status',
			},
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema)
