const express = require('express')
const router = express.Router()
const pageService = require('../services/pageService')
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })

router.get('/signin', pageService.signInPage)
router.get('/index', authenticated, pageService.IndexPage)

module.exports = router
