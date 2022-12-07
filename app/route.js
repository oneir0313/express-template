const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const pageRouter = require('./routes/page')
const usersRouter = require('./routes/users')
const listEndpoints = require('express-list-endpoints')
const debug = require('debug')('app:routes')
const passport = require('./config/passport')
const flash = require('connect-flash')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * Middlewares, Passport, Session
 */

app.use(logger(process.env.MORGAN_LOG_FORMAT))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET || 'hello express',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'development' }
}))
app.use(passport.initialize())
app.use(passport.session())

// static setup
app.use('/static', express.static(path.join(__dirname, 'public')))

// front-end route
app.use('/', pageRouter)

// back-end route
app.use('/api', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const error = {
    code: 1,
    ...(req.app.get('env') === 'development' ? err : {})
  }
  // response the error
  res.status(err.status || 500)
  res.json(error)
})

debug(listEndpoints(app))

module.exports = app
