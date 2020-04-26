const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API);

const postBooking = (payload) => api
    .post('/booking')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(payload);

const deleteBooking = (idBooking, token) => api
    .delete(`/booking/${idBooking}`)
    .set('Cookie', 'token=' + token);

module.exports = {
    postBooking,
    deleteBooking
}