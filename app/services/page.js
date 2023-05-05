const db = require('../repositories/models')
const User = db.User
const utils = require('../libs/utils')
const { authenticator } = require('otplib')
const base32 = require('thirty-two')
const QRCode = require('qrcode')

const signInPage = (req, res, next) => {
  res.render('signin')
}

const indexPage = (req, res, next) => {
  res.render('index', { title: 'Express Template', user: req.user.account })
}

const setupPage = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } })
    let key
    if (user?.otpKey) {
      key = user.otpKey
    } else {
      key = utils.randomKey(16)
      await user.update({ otpKey: key })
    }
    const encodedKey = base32.encode(key)
    const qrImage = await QRCode.toDataURL(authenticator.keyuri(user.account, 'your key', encodedKey))

    res.render('setup', { user: req.user, key, qrImage })
  } catch (error) {
    next(error)
  }
}

module.exports = { signInPage, indexPage, setupPage }
