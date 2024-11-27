const Joi = require('joi')

module.exports.userSchema = {
	signupUser: Joi.object({
		firstName: Joi.string().min(3).max(15).required().messages({
			'string.base': 'First name must be a string',
			'string.empty': 'First name is required',
			'string.min': 'First name must be at least 3 characters long',
			'string.max': 'First name must not exceed 15 characters',
			'any.required': 'First name is required',
		}),
		lastName: Joi.string().min(3).max(15).required().messages({
			'string.base': 'Last name must be a string',
			'string.empty': 'Last name is required',
			'string.min': 'Last name must be at least 3 characters long',
			'string.max': 'Last name must not exceed 15 characters',
			'any.required': 'Last name is required',
		}),
		email: Joi.string().email().required().messages({
			'string.email': 'Please enter a valid email address',
			'string.empty': 'Email is required',
			'any.required': 'Email is required',
		}),
		password: Joi.string().min(6).required().messages({
			'string.min': 'Password must be at least 6 characters long',
			'string.empty': 'Password is required',
			'any.required': 'Password is required',
		}),
		confirmPassword: Joi.string()
			.required()
			.valid(Joi.ref('password'))
			.messages({
				'any.only': 'Confirm password must match password',
				'any.required': 'Confirm password is required',
			}),
		gender: Joi.string().optional(),
	}),

	loginUser: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
}
