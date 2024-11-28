const express = require('express')
const { checkIsAuth } = require('../middleware')
const {
	sendConnectionRequestController,
} = require('../controllers/connectionRequest.controller')
const {
	sendConnectionRequestValidation,
} = require('../middleware/validation/connectionRequestValidation')

const router = express.Router()

router.post(
	'/send/:status/:toUserId',
	checkIsAuth,
	sendConnectionRequestValidation,
	sendConnectionRequestController,
)
router.get('/', checkIsAuth, (re, res) => {
	res.send({
		msg: 'request route',
	})
})

module.exports = router
