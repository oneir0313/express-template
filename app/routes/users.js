const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

/* 登入 */
router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/page/index',
  failureRedirect: '/page/signin',
  failureFlash: true
}))

module.exports = router
