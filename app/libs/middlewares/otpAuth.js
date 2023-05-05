module.exports = async function otpAuth (req, res, next) {
  if (process.env.PASSPORT_TOTP_ENABLE && !req.session.isOtpAuthenticated) { return res.redirect('/login-otp') }
  next()
}
