const statusCode = require('../libs/statusCode')

const health = (req, res, next) => {
  const data = {
    code: statusCode.ok.code,
    codeNO: statusCode.ok.codeNO,
    uptime: process.uptime(),
    date: new Date()
  }

  res.status(200).send(data)
}

module.exports = { health }
