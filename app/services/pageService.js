const pageService = {
  signInPage: (req, res, next) => {
    res.render('signin')
  },
  IndexPage: (req, res, next) => {
    res.render('index', { title: 'Express' })
  }
}

module.exports = pageService
