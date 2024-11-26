const customResponse = ({
	data = null,
	success = true,
	error = null,
	message = '',
	status = 200,
}) => {
	return {
		success,
		error,
		message,
		status,
		data,
	}
}

module.exports = customResponse
