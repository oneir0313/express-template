const signInPage = (req, res, next) => {
  res.render('signin')
}

const indexPage = (req, res, next) => {
  res.render('index', { title: 'Express' })
}

module.exports = { signInPage, indexPage }
