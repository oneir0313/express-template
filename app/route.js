const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const pageRouter = require('./routes/page')
const usersRouter = require('./routes/users')
const listEndpoints = require('express-list-endpoints')
const debug = require('debug')('app:routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger(process.env.MORGAN_LOG_FORMAT))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// static setup
app.use('/static', express.static(path.join(__dirname, 'public')))

// front-end route
app.use('/page', pageRouter)

// back-end route
app.use('/api', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

debug(listEndpoints(app))

module.exports = app
