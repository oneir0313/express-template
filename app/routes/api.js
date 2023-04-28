const express = require('express')
const router = express.Router()
const { signIn, signOut, session } = require('../services/userService')
const { health } = require('../services/commonService')

/* Users */
router.post('/users/signin', signIn)
router.get('/users/signout', signOut)
router.get('/users/session', session)

/* Common */
router.get('/health', health)

module.exports = router
