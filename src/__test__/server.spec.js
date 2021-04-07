const supertest = require('supertest')
const app = require('../server/')
const request = supertest(app)


describe('Post Endpoints', () => {
  it('should retrieve a city back from the end point', async () => {
    const res = await request//request(app)
      .post('/postcity')
      .send({
        city: "San Francisco"
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('city');
  })
})