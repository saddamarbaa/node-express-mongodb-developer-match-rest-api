const jwt = require('jsonwebtoken')

function generateJwtToken(payload, secret, signOptions) {
	return new Promise(function (resolve, reject) {
		jwt.sign(payload, secret, signOptions, (err, encoded) => {
			if (err === null && encoded !== undefined) {
				resolve(encoded)
			} else {
				reject(err)
			}
		})
	})
}

module.exports = generateJwtToken