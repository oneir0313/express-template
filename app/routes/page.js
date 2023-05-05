const express = require('express')
const router = express.Router()
const { indexPage, signInPage, setupPage } = require('../services/page')
const otpAuth = require('../libs/middlewares/otpAuth')

const authenticated = process.env.PROXY_URL === '' ? require('../libs/middlewares/authenticate') : require('../libs/middlewares/proxyAuth')

router.get('/signin', signInPage)
router.get('/index', authenticated, otpAuth, indexPage)
router.get('/setup', authenticated, setupPage)

module.exports = router
