const express = require('express')
const router = express.Router()
const pageService = require('../services/pageService')
const authenticated = process.env.PROXY_TO === '' ? require('../libs/authenticate') : require('../libs/proxyAuth')

router.get('/signin', pageService.signInPage)
router.get('/index', authenticated, pageService.IndexPage)
router.get('/test', pageService.testPage)

module.exports = router
