const express = require('express')

const authRoutes = require('../routes/auth.route')

const router = express.Router()

router.use('/auth', authRoutes)

module.exports = router
