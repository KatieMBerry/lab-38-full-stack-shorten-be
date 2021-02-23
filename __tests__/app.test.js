const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('shorten-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('creates a short url via post', async () => {
    return request(app)
      .post('/api/v1/shorten')
      .send({ url: 'http://test.com/a/very/long/url' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.stringMatching(/^\w{8}$/),
          originalUrl: 'http://test.com/a/very/long/url'
        });
      });
  });
});
