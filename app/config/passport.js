const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../repositories/models')
const User = db.User

// setup passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'account',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, username, password, done) => {
    User.findOne({ where: { account: username } }).then(user => {
      if (!user) return done(null, false, '帳號或密碼輸入錯誤')
      if (!bcrypt.compareSync(password, user.password)) return done(null, false, '帳號或密碼輸入錯誤！')
      return done(null, user)
    })
  }
))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {}).then(user => {
    return cb(null, user)
  })
})

// JWT
if (process.env.PASSPORT_STRATEGY === 'jwt') {
  const passportJWT = require('passport-jwt')
  const ExtractJwt = passportJWT.ExtractJwt
  const JwtStrategy = passportJWT.Strategy

  const jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  jwtOptions.secretOrKey = process.env.JWT_SECRET

  const strategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
    User.findByPk(jwtPayload.id, {
      include: []
    }).then(user => {
      if (!user) return next(null, false)
      return next(null, user)
    })
  })
  passport.use(strategy)
}

module.exports = passport
