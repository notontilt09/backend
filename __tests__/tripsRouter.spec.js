const request = require('supertest');
const server = require('../api/server');
const {
	trip: { getTrips, getTripsByUser, getTripById, updateTrip, deleteTrip, createTrip }
} = require('../api/helpers');

var token;

beforeAll(async () => {
	const response = await request(server)
		.post('/auth/login')
		.send({
			password: '850RKI7uKgC',
			username: 'sjoskowitz0'
		});
	token = response.body.token;
});

describe('Trips router tests (/trips routes)', () => {
	it('', () => {});
});
