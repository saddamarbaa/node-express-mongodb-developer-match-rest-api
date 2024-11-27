const createHttpError = require('http-errors')

const validator = async (schemaName, body, next) => {
	const value = await schemaName.validate(body, {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true, // remove unknown props
	})

	try {
		value.error
			? next(createHttpError(422, value.error.details[0].message))
			: next()
	} catch (error) {
		console.log(error)
	}
}

module.exports = validator
