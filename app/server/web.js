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
if (process.env.PROXY_TO !== '') {
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
