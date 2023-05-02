const signInPage = (req, res, next) => {
  res.render('signin')
}

const indexPage = (req, res, next) => {
  res.render('index', { title: 'Express Template', user: req.user.account })
}

module.exports = { signInPage, indexPage }
