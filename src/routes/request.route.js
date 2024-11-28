const express = require('express')
const { checkIsAuth } = require('../middleware')

const router = express.Router()

router.get('/', checkIsAuth, (re, res) => {
  res.send({
    msg:"request route"
  })
})

module.exports = router
