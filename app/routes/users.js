const express = require('express')
const router = express.Router()
const userService = require('../services/userService')

/* GET users listing. */
router.post('/users/signin', userService.signIn)

module.exports = router
