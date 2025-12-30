const mongoose = require('mongoose')

/* ---------------- MESSAGE SUB-SCHEMA ---------------- */
const MessageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true, // adds createdAt & updatedAt
	},
)

/* ---------------- CHAT SCHEMA ---------------- */
const ChatSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		],

		messages: [MessageSchema],
	},
	{
		timestamps: true,
	},
)

/* ---------------- INDEX (IMPORTANT) ---------------- */
// Fast lookup for 1-to-1 chats
ChatSchema.index({ participants: 1 })

/* ---------------- MODELS ---------------- */
const Message = mongoose.model('Message', MessageSchema)
const Chat = mongoose.model('Chat', ChatSchema)

/* ---------------- EXPORT ---------------- */
module.exports = {
	Message,
	Chat,
}
