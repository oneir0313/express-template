const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const proxy = require('express-http-proxy')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const morganMiddleware = require('../libs/middlewares/morgan')
const pageRouter = require('../routes/page')
const apiRouter = require('../routes/api')
const listEndpoints = require('express-list-endpoints')
const logger = require('../libs/logger')
const passport = require('../config/passport')
const errorHandler = require('../libs/middlewares/errorHandler')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
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

if (process.env.PROXY_URL === '') {
  // back-end setting
  app.set('trust proxy', 1)
  app.use('/api' + process.env.API_VERSION, apiRouter)
} else {
  // front-end setting
  app.use('/api', proxy(process.env.PROXY_URL, {
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
app.use(errorHandler)

// list all endpoints
logger.debug('list all routes:')
listEndpoints(app).forEach(el => {
  logger.debug(`route: ${el.path}, methods: ${el.methods.join(', ')}, middlewares: ${el.middlewares.join(', ')}`)
})

module.exports = app
