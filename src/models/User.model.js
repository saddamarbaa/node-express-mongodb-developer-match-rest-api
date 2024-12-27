const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { GENDER_OPTIONS } = require('../constants/auth')
const { environmentConfig } = require('../config')

const userSchema = new mongoose.Schema(
	{
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
			required: [false, 'Please provide surname'],
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
		gender: {
			type: String,
			trim: true,
			lowercase: true,
			enum: {
				values: [...GENDER_OPTIONS],
				message: 'Gender must be either male, female, or other',
			},
		},
		bio: {
			type: String,
			maxLength: [500, "Bio can't be longer than 500 characters"],
			trim: true,
		},
		skills: {
			type: [String], // Array of strings for multiple skills
			default: [],
		},
		profileUrl: {
			type: String,
			// match: [/^https?:\/\/[^\s]+$/, 'Please provide a valid URL'],
			trim: true,
			// update in future
			default:
				'https://tse3.mm.bing.net/th?id=OIP.W4S-DdCjOjUS4LqYNUieYwHaHa&pid=Api&P=0&h=220',
		},
		acceptTerms: { type: Boolean, required: false, default: false },
	},
	{
		timestamps: true,
	},
)

userSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password)
	return isMatch
}

userSchema.pre('save', async function (next) {
	if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
		console.log('Middleware called before saving the user is', this)
	}

	const user = this
	if (user.isModified('password')) {
		const salt = await bcrypt.genSalt(12)
		user.password = await bcrypt.hash(user.password, salt)
		user.confirmPassword = await bcrypt.hash(user.password, salt)
	}
	next()
})

userSchema.methods.createJWT = function () {
	const payload = {
		userId: this._id,
		email: this.email,
		name: this.firstName,
		dateOfBirth: this.dateOfBirth,
		gender: this.gender,
		role: this.role,
	}

	return jwt.sign(payload, environmentConfig.JWT_TOKEN_SECRET, {
		expiresIn: environmentConfig.JWT_EXPIRE_TIME,
	})
}

module.exports = mongoose.model('User', userSchema)
