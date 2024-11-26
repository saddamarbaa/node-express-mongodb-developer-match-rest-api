const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		lowercase: true,
		required: [true, 'Please provide first name'],
		minLength: [3, "First name can't be smaller than 3 characters"],
		maxLength: [15, "First Name can't be greater than 15 characters"],
	},
	lastName: {
		type: String,
		trim: true,
		lowercase: true,
		required: [true, 'Please provide surname'],
		minLength: [3, "Surname can't be smaller than 3 characters"],
		maxLength: [15, "Surname can't be greater than 15 characters"],
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		// a regular expression to validate an email address(stackoverflow)
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
		unique: true, // `email` must be unique
		index: true,
		trim: true,
		lowercase: true,
		maxLength: [128, "Email can't be greater than 128 characters"],
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: [6, 'Password must be more than 6 characters'],
		trim: true,
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, 'Please provide confirmed Password'],
		minlength: [6, 'Password must be more than 6 characters'],
		trim: true,
		select: false,
	},
	gender: { type: String, trim: true, lowercase: true },
})

module.exports = mongoose.model('User', userSchema)
