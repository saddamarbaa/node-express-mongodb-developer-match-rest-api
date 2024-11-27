const express = require('express')

const authRoutes = require('../routes/auth.route')
const feedRoute = require("../routes/feed.route")


const router = express.Router()

router.use('/auth', authRoutes)
router.use('/feed', feedRoute);

module.exports = router
