const express = require('express')

const authRoutes = require('../routes/auth.route')
const userRoutes = require('../routes/user.route')
const requestRoute = require('../routes/connectionRequest.route')
const chatRouter = require('../routes/chat.route')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/request', requestRoute)
router.use('/chat', chatRouter)

module.exports = router
