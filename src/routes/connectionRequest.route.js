const express = require('express')
const { checkIsAuth } = require('../middleware')
const {
	sendConnectionRequestController,
	reviewConnectionRequestController,
} = require('../controllers/connectionRequest.controller')
const {
	sendConnectionRequestValidation,
	reviewConnectionRequestValidation,
} = require('../middleware/validation/connectionRequestValidation')

const router = express.Router()

router.post(
	'/send/:status/:toUserId',
	checkIsAuth,
	sendConnectionRequestValidation,
	sendConnectionRequestController,
)

router.post(
	'/review/:status/:requestId',
	checkIsAuth,
	reviewConnectionRequestValidation,
	reviewConnectionRequestController,
)

module.exports = router
