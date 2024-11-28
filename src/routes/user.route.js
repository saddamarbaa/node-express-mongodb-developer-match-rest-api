const express = require('express')

const { getUserPendingRequestsController } = require('../controllers/user.controller')
const { checkIsAuth } = require('../middleware')

const router = express.Router()

router.get('/requests/pending',checkIsAuth, getUserPendingRequestsController)

module.exports = router
