const express = require('express')
const router = express.Router()
const userService = require('../services/userService')
const commonService = require('../services/commonService')

/* Users */
router.post('/users/signin', userService.signIn)
router.get('/users/signout', userService.signOut)
router.get('/users/session', userService.session)

/* Common */
router.get('/health', commonService.health)

module.exports = router
