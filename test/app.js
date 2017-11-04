const request = require('supertest');
const app = require('../app.js');

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /api', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});

describe('GET /contact', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});


