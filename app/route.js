const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const proxy = require('express-http-proxy')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const morganMiddleware = require('./libs/middlewares/morgan')
const pageRouter = require('./routes/page')
const apiRouter = require('./routes/api')
const listEndpoints = require('express-list-endpoints')
const logger = require('./libs/logger')
const passport = require('./config/passport')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * Middlewares, Passport, Session
 */

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morganMiddleware)

app.use(session({
  secret: process.env.SESSION_SECRET || 'hello express',
  cookie: { secure: app.get('env') === 'production', maxAge: 86400000 },
  resave: false,
  saveUninitialized: false,
  proxy: true
}))
app.use(passport.initialize())
app.use(passport.session())

// static setup
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', pageRouter)

if (process.env.PROXY_TO === '') {
  // back-end setting
  app.set('trust proxy', 1)
  app.use('/api', apiRouter)
} else {
  // front-end setting
  app.use('/api', proxy(process.env.PROXY_TO, {
    proxyReqPathResolver: (req) => {
      return '/api' + req.url
    }
  }))
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const data = {
    code: 1
  }
  data.Message = err.Message || err.message
  if (req.app.get('env') === 'development') {
    logger.error(err)
    data.stack = err.stack
  }
  // response the error
  res.status(err.status || 500)
  res.json(data)
})

logger.debug(listEndpoints(app))

module.exports = app
