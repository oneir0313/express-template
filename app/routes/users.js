const express = require('express')
const router = express.Router()
const userService = require('../services/userService')

/* 登入 */
router.post('/users/signin', userService.signIn)

module.exports = router
