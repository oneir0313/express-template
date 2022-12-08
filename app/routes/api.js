const express = require('express')
const router = express.Router()
const userService = require('../services/userService')
const commonService = require('../services/commonService')

/* Sign in */
router.post('/users/signin', userService.signIn)

/* Sign Out */
router.get('/users/signout', userService.signOut)

/* Session */
router.get('/session', userService.session)

/* Health */
router.get('/health', commonService.health)

module.exports = router
