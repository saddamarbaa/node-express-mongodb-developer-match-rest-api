const express = require('express')

const authRoutes = require('../routes/auth.route')
const userRoutes = require('../routes/user.route')
const requestRoute = require('../routes/connectionRequest.route')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/request', requestRoute)

module.exports = router
