const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API);

const postToken = (payload) => api
    .post('/auth')
    .set('Content-Type', 'application/json')
    .send(payload);

module.exports = {
    postToken
}