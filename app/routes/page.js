const express = require('express')
const router = express.Router()
const pageService = require('../services/pageService')
const authenticated = require('../libs/authenticate')

router.get('/signin', pageService.signInPage)
router.get('/index', authenticated, pageService.IndexPage)
router.get('/test', pageService.testPage)

module.exports = router
