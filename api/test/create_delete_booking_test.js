const assert = require('chai').expect;
const page = require('../page/create_delete_api_page.js');
const generateToken = require('../page/create_token.js');
const data = require('../data/booking_data.json');
const schema = require('../data/schema/booking_schema.json');
const dataToken = require('../data/auth_data.json');
const code = require('../helper/response_code_message.json');
var chai = require('chai');
chai.use(require('chai-json-schema'));

const testCaseBooking = {
    "positive": {
        "postBooking": "As an User, I should be able to create booking",
    },
    "negative": {
        "invalidData": "As an User, I should not be able to create booking if the data provided is invalid",
    }
};

const testCaseDelete = {
    "positive": {
        "deleteBookingID": "As an User, I should be able to delete booking according to the ID",
    },
    "negative": {
        "invalidID": "As an User, I should not be able to delete booking if the ID provided is invalid",
        "invalidToken": "As an User, I should not be able to delete booking if the token is invalid"
    }
};

let token, bookingID;
let invalidBookingID = 9999;
let invalidToken = 'ujnaxn876ajj';
let invalidDataTest = '';

describe(`Mekari Test using Restful Booker`, () => {
    before('token', async () => {
        const response = await generateToken.postToken(dataToken);
        assert(response.status).to.equal(code.successOk);
        token = response.body.token;
    })

    describe('Test Case for Booking', () => {
        it(`@post ${testCaseBooking.positive.postBooking}`, async () => {
            const response = await page.postBooking(data.data1);
            assert(response.status).to.equal(code.successOk);
            assert(response.body).to.be.jsonSchema(schema);
            bookingID = response.body.bookingid;
        })

        it(`@post ${testCaseBooking.negative.invalidData}`, async () => {
            const response = await page.postBooking(invalidDataTest);
            assert(response.status).to.equal(code.failedInternalServerError);
        })
    })

    describe('Test Case for Delete Booking', () => {
        it(`@delete ${testCaseDelete.positive.deleteBookingID}`, async () => {
            const response = await page.deleteBooking(bookingID, token);
            assert(response.status).to.equal(code.successProcess);
        })

        it(`@delete ${testCaseDelete.negative.invalidToken}`, async () => {
            const response = await page.deleteBooking(bookingID, invalidToken);
            assert(response.status).to.equal(code.failedForbiddenInvalidToken.codeNumber);
        })

        it(`@delete ${testCaseDelete.negative.invalidID}`, async () => {
            const response = await page.deleteBooking(invalidBookingID, token);
            assert(response.status).to.equal(code.failedMethodNotAllowed.codeNumber);
        })
    })
})