const axios = require('axios')
const statusCode = require('../statusCode')

/**
 * 轉打後端API 當env {PROXY_URL} 有開啟時此function則啟動
 */
module.exports = async function (req, res, next) {
  if (!process.env.PROXY_URL) {
    next()
  }
  const url = process.env.PROXY_URL + '/api/session'
  try {
    const response = await axios({
      headers: {
        cookie: req.headers.cookie
      },
      method: 'get',
      url
    }, { withCredentials: true })

    if (response.status !== 200) {
      return res.status(response.status).json(response.data)
    }

    if (response.data.code === 0) {
      next()
    } else {
      return res.status(statusCode.unauthenticated.httpStatus).json({
        code: statusCode.unauthenticated.code,
        codeNO: statusCode.unauthenticated.codeNO,
        message: statusCode.unauthenticated.message
      })
    }
  } catch (error) {
    res.status(error.status || statusCode.unknown.httpStatus)
    const code = error.code || statusCode.unknown.code
    const codeNO = error.codeN || statusCode.unknown.codeNO
    return res.json({
      code,
      codeNO,
      message: '登入伺服器錯誤',
      error
    })
  }
}
