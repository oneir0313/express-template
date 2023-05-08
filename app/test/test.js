const chai = require('chai')
const chaiHttp = require('chai-http')

const api = require('../server/api')

chai.use(chaiHttp)
chai.should()

describe('API /health', () => {
  it('it should return 200', done => {
    chai
      .request(api)
      .get('/api/health')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        res.should.have.status(200)
        done()
      })
  })
})
