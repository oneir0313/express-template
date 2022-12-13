module.exports = {
  ok: {
    code: 'OK',
    codeNO: 0,
    message: '操作成功',
    httpStatus: 200
  },
  unknown: {
    code: 'UNKNOWN',
    codeNO: 2,
    message: '未知錯誤',
    httpStatus: 500
  },
  invalidArgument: {
    code: 'INVALID_ARGUMENT',
    codeNO: 3,
    message: '解析參數錯誤',
    httpStatus: 400
  },
  deadlineExceeded: {
    code: 'DEADLINE_EXCEEDED',
    codeNO: 4,
    message: '操作超時',
    httpStatus: 504
  },
  notFound: {
    code: 'NOT_FOUND',
    codeNO: 5,
    message: '請求資源錯誤',
    httpStatus: 504
  },
  alreadyExists: {
    code: 'ALREADY_EXISTS',
    codeNO: 6,
    message: '資料已存在',
    httpStatus: 409
  },
  permissionDenied: {
    code: 'PERMISSION_DENIED',
    codeNO: 7,
    message: '資權限不足',
    httpStatus: 403
  },
  resourceExhausted: {
    code: 'RESOURCE_EXHAUSTED',
    codeNO: 8,
    message: '請求出過限制',
    httpStatus: 429
  },
  unimplemented: {
    code: 'UNIMPLEMENTED',
    codeNO: 12,
    message: '未實作',
    httpStatus: 501
  },
  internal: {
    code: 'INTERNAL',
    codeNO: 13,
    message: '系統內部錯誤',
    httpStatus: 500
  },
  unavilable: {
    code: 'UNAVAILABLE',
    codeNO: 14,
    message: '無法獲取服務',
    httpStatus: 503
  },
  unauthenticated: {
    code: 'UNAUTHENTICATED',
    codeNO: 16,
    message: '驗證已失效',
    httpStatus: 401
  }
}
