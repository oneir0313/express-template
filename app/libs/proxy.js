const request = require('request').defaults({ jar: true })
const utils = require('../../../utils/utils')
const querystring = require('querystring')

/**
 * 轉打後端API 當env {BACKEND_URL}有開啟時此function則啟動
 */
module.exports = function (req, res, next) {
  const j = request.jar()
  if (!process.env.BACKEND_URL) {
    next()
  }
  const uri = process.env.BACKEND_URL + req.originalUrl

  const cookies = req.headers.cookie && req.headers.cookie.length > 0 ? req.headers.cookie.trim().split(';') : []

  for (const idx in cookies) {
    if (cookies[idx].match('connect.sid')) {
      j.setCookie(`connect.sid=${req.session['cookie.sid']}`, uri)
    } else {
      j.setCookie(cookies[idx], uri)
    }
  }

  const newHeaders = {}
  newHeaders['x-real-ip'] = req.headers['x-real-ip'] || req.socket.remoteAddress || ''
  newHeaders['x-forwarded-for'] = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''

  for (const header in req.headers) {
    if (header !== 'cookie' && header.match('user-agent|content-type')) {
      newHeaders[header] = req.headers[header]
    }
  }

  let body = {}
  if (req.headers['content-type'] && req.headers['content-type'].match('application/x-www-form-urlencoded')) {
    const row = querystring.stringify(req.body)
    body = {
      body: row
    }
  } else {
    body = {
      body: req.body
    }
  }

  const options = {
    uri,
    method: req.method,
    jar: j,
    headers: newHeaders,
    ...(req.body && Object.keys(req.body).length > 0 && {
      ...body
    })
  }
  request(options)
    .on('error', function (err) {
      utils.error(err)
      next()
    }).pipe(res)
}
