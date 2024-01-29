const request = require('supertest');
const app = require('./app');

describe('/spendings', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/spendings')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('It should response the GET method with an array', (done) => {
    request(app)
      .get('/spendings')
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        done();
      });
  });

  test('It should response the POST method', (done) => {
    const spending = {
      description: 'Mango',
      amount: 1200,
      spent_at: '2022-02-23T14:47:20.381Z',
      currency: 'USD',
    };

    request(app)
      .post('/spendings')
      .send(spending)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  test('It should response the POST method with created object info in case of invalid request data', (done) => {
    const spending = {
      description: 'Mango',
      amount: '1200',
      spent_at: '2022-02-23T14:47:20.381Z',
      currency: 'USD',
    };

    request(app)
      .post('/spendings')
      .send(spending)
      .then((response) => {
        expect(response.body).toMatchObject(spending);
        done();
      });
  });

  test('It should response the POST method with an error in case of invalid request data', (done) => {
    const spending = {
      description: 'Mango',
      amount: 'one thousand',
      spent_at: '2022-02-23T14:47:20.381Z',
      currency: 'USD',
    };

    request(app)
      .post('/spendings')
      .send(spending)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
