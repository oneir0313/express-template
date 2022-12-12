const axios = require('axios')

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
      return res.status(500).json({
        code: 2,
        message: '登入伺服器錯誤'
      })
    }

    if (response.data.code === 0) {
      next()
    } else {
      return res.status(403).json({
        code: response.data.code,
        message: response.data.message
      })
    }
  } catch (error) {
    res.status(error.status || 500)

    return res.json({
      code: 2,
      message: '登入伺服器錯誤',
      error
    })
  }
}
