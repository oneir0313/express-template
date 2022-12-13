const logger = require('../logger')
const statusCode = require('../statusCode')

module.exports = function (err, req, res, next) {
  // set locals, only providing error in development
  const data = {
    codeNO: statusCode.unknown.codeNO,
    code: statusCode.unknown.code
  }
  data.Message = err.Message || err.message
  if (req.app.get('env') === 'development') {
    logger.error(err)
    data.stack = err.stack
  }
  // response the error
  res.status(err.status || statusCode.unknown.httpStatus)
  res.json(data)
}
