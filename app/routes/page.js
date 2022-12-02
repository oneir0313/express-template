const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })

router.get('/signin', function (req, res, next) {
  res.render('signin')
})

router.get('/index', authenticated, function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
