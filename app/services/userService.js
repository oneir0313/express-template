const bcrypt = require('bcryptjs')
const db = require('../repositories/models')
const User = db.User

const jwt = require('jsonwebtoken')
const passport = require('../config/passport')

const userService = {}

userService.signIn = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json({
        code: 1,
        message: info
      })
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.json({
        code: 0,
        message: '登入成功',
        redirect: 'index'
      })
    })
  })(req, res, next)
}

userService.signOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.json({
      code: 0,
      message: '登出成功',
      redirect: 'index'
    })
  })
}

userService.jwt = (req, res, next) => {
  // 檢查必要資料
  if (!req.body.email || !req.body.password) {
    return res.json({ status: 'error', message: "required fields didn't exist" })
  }
  // 檢查 user 是否存在與密碼是否正確
  const username = req.body.account
  const password = req.body.password

  User.findOne({ where: { account: username } })
    .then(user => {
      if (!user) return res.status(401).json({ status: 'error', message: 'no such user found' })
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ status: 'error', message: 'passwords did not match' })
      }

      // 簽發 token
      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      return res.json({
        status: 'success',
        message: 'ok',
        token,
        user: {
          id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin
        }
      })
    })
    .catch(err => {
      next(err)
    })
}

userService.session = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({
      code: 0,
      user: {
        id: req.session.passport.user
      }
    })
  }
  return res.json({
    code: 1,
    message: '請先登入'
  })
}

module.exports = userService
