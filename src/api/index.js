const express = require('express')

const authRoutes = require('../routes/auth.route')
const feedRoute = require("../routes/feed.route")
const profileRoute = require("../routes/profile.route")
const requestRoute = require('../routes/connectionRequest.route')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/feed', feedRoute);
router.use("/profile", profileRoute)
router.use("/request", requestRoute)

module.exports = router
