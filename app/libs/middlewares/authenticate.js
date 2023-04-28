module.exports = function authenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/signin')
}
