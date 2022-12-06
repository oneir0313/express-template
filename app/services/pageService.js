const pageService = {
  signInPage: (req, res, next) => {
    res.render('signin')
  },
  IndexPage: (req, res, next) => {
    res.render('index', { title: 'Express' })
  },
  testPage: (req, res, next) => {
    res.render('test')
  }
}

module.exports = pageService
