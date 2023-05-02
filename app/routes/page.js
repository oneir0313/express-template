const express = require('express')
const router = express.Router()
const { indexPage, signInPage } = require('../services/page')
const authenticated = process.env.PROXY_URL === '' ? require('../libs/middlewares/authenticate') : require('../libs/middlewares/proxyAuth')

router.get('/signin', signInPage)
router.get('/index', authenticated, indexPage)

module.exports = router
