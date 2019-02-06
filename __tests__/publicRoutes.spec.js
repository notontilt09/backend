const request = require('supertest');
const server = require('../api/server');
const { getPublicTrips, getById } = require('../api/helpers/tripHelpers');
const { getUsers } = require('../api/helpers/guideHelpers');

describe('Public (no auth) Routes', () => {
	describe('GET /guidr/trips/all Trips Route', () => {
		it('should respond with status code 200', async () => {
			const response = await request(server).get('/guidr/trips/all');

			expect(response.status).toBe(200);
		});
		it('should send back only Professional trips', async () => {
			const response = await request(server).get('/guidr/trips/all');
			const expected = await getPublicTrips();

			expect(response.body[0].id).toBe(expected[0].id);
			expect(response.body[10].id).toEqual(expected[10].id);
		});
	});
	describe('GET /guidr/trips/:tripId', () => {
		it('should respond with 200 if trip exists', async () => {
			let id = 10;
			const response = await request(server).get(`/guidr/trips/${id}`);

			expect(response.status).toBe(200);
		});
		it('should send trip object', async () => {
			let id = 10;
			let response = await request(server).get(`/guidr/trips/${id}`);
			let expected = await getById(id);

			expect(response.body.id).toEqual(expected.id);
			expect(response.body.length).toEqual(expected.length);
		});
		it('should respond with 404 if invalid id', async () => {
			let id = 1000;
			let response = await request(server).get(`/guidr/trips/${id}`);

			expect(response.status).toEqual(404);
		});
	});
	describe('GET /guidr/guides/all', () => {
		it('should respond with status 200 ok', async () => {
			const response = await request(server).get('/guidr/guides/all');

			expect(response.status).toEqual(200);
		});
		it('should not send out username or hashed pass', async () => {
			let response = await request(server).get('/guidr/guides/all');
			let expected = await getUsers();

			expect(response.body[0].careerLength).toEqual(expected[0].careerLength);
			expect(response.body[0].username).toBeFalsy();
			expect(response.body[5].password).toBeFalsy();
			expect(response.body[5].age).toEqual(expected[5].age);
			expect(response.body[8].tagline).toBeTruthy();
			expect(response.body[8].title).toEqual(expected[8].title);
			expect(response.body.length).toEqual(expected.length);
		});
	});
});
