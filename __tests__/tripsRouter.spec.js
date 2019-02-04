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
	it('should respond with 200', async () => {
		let guideId = 1;
		const response = await request(server)
			.get(`/user/trips/${guideId}/all`)
			.set('authorization', token);

		expect(response.status).toBe(200);
	});
	it('should respond with 404 for bad id', async () => {
		let guideId = 100;
		const response = await request(server)
			.get(`/user/trips/${guideId}/all`)
			.set('authorization', token);

		expect(response.status).toBe(404);
	});
	it('should return array of objects', async () => {
		let guideId = 1;
		let response = await request(server)
			.get(`/user/trips/${guideId}/all`)
			.set('authorization', token);
		let expected = await getTripsByUser(guideId);

		expect(response.body.length).toEqual(expected.length);
		expect(response.body[0].id).toEqual(expected[0].id);

		response.body.map((obj, i) => {
			expect(obj.id).toEqual(expected[i].id);
		});
	});
	describe('GET /:id/:tripId route', () => {
		it('it should return 200 status for good request', async () => {
			const guideId = 1;
			const tripId = 5;
			let response = await request(server)
				.get(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token);

			expect(response.status).toBe(200);
		});
		it('it should return 404 status for bad tripId or guideId', async () => {
			let guideId = 1;
			let tripId = 50;
			let response = await request(server)
				.get(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token);

			expect(response.status).toBe(404);

			guideId = 9;
			tripId = 5;
			esponse = await request(server)
				.get(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token);

			expect(response.status).toBe(404);
		});
		it('should respond with trip object', async () => {
			const guideId = 1;
			const tripId = 5;
			let response = await request(server)
				.get(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token);
			let expected = await getTripById(tripId, guideId);

			expect(response.body).toBeTruthy();
			expect(response.body.id).toEqual(expected.id);
			expect(response.body.title).toEqual(expected.title);
			expect(response.body.description).toEqual(expected.description);
			expect(response.body.designation).toEqual(expected.designation);
		});
	});
});
