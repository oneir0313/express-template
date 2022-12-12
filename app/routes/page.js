const express = require('express')
const router = express.Router()
const pageService = require('../services/pageService')
const authenticated = process.env.PROXY_URL === '' ? require('../libs/middlewares/authenticate') : require('../libs/middlewares/proxyAuth')

router.get('/signin', pageService.signInPage)
router.get('/index', authenticated, pageService.IndexPage)
router.get('/test', pageService.testPage)

module.exports = router
