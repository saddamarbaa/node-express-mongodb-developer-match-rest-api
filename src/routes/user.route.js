const express = require('express')

const {
	getUserPendingRequestsController,
	getUserMatchConnectionsController,
	getUserFeedController,
} = require('../controllers/user.controller')
const { checkIsAuth } = require('../middleware')

const router = express.Router()


router.get('/feed', checkIsAuth, getUserFeedController)
router.get('/requests/pending', checkIsAuth, getUserPendingRequestsController)
router.get('/match/connections', checkIsAuth, getUserMatchConnectionsController)

module.exports = router
