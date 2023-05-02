const createError = require('http-errors')
const express = require('express')
const proxy = require('express-http-proxy')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const morganMiddleware = require('../libs/middlewares/morgan')
const pageRouter = require('../routes/page')
const listEndpoints = require('express-list-endpoints')
const logger = require('../libs/logger')
const errorHandler = require('../libs/middlewares/errorHandler')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

/**
 * Middlewares, Passport, Session
 */
app.use(helmet())
app.use(cookieParser())
app.use(morganMiddleware)

// static setup
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', pageRouter)

// front-end setting
if (process.env.PROXY_URL !== '') {
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
  logger.debug(`route: ${el.path}, methods: ${el.methods.join(', ')}`)
})
module.exports = app
