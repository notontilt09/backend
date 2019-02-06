const request = require('supertest');
const server = require('../api/server');
const { getTripsByUser, getTripByIds } = require('../api/helpers/tripHelpers');

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

	describe('GET /:guideId/:tripId route', () => {
		it('it should return 200 status for good request', async () => {
			const guideId = 1;
			const tripId = 5;
			let response = await request(server)
				.get(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token);

			expect(response.status).toBe(200);
		});
		it('should return 404 status for bad tripId or guideId', async () => {
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
			let expected = await getTripByIds(tripId, guideId);

			expect(response.body).toBeTruthy();
			expect(response.body.id).toEqual(expected.id);
			expect(response.body.title).toEqual(expected.title);
			expect(response.body.description).toEqual(expected.description);
			expect(response.body.designation).toEqual(expected.designation);
		});
	});

	describe('PUT /:guideId/:tripId route', () => {
		it('should respond with 203 for success', async () => {
			let guideId = 1;
			let tripId = 5;
			let update = { description: 'wow no way' };
			let response = await request(server)
				.put(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token)
				.send(update);

			expect(response.status).toBe(203);
		});
		it('should respond with 404 for wrong guideId', async () => {
			let guideId = 111;
			let tripId = 5;
			let update = { description: 'wow no way' };
			let response = await request(server)
				.put(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token)
				.send(update);

			expect(response.status).toBe(404);
		});
		it('should respond with 400 for no guide/trip not being linked', async () => {
			let guideId = 3;
			let tripId = 5;
			let update = { description: 'wow no way' };
			let response = await request(server)
				.put(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token)
				.send(update);

			expect(response.status).toBe(400);
		});
		it('should respond with 404 for wrong tripId', async () => {
			let guideId = 1;
			let tripId = 333;
			let update = { description: 'wow no way' };
			let response = await request(server)
				.put(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token)
				.send(update);

			expect(response.status).toBe(404);
		});
		it('should return id of changed trip', async () => {
			let guideId = 1;
			let tripId = 5;
			let update = { description: 'wow no way' };
			let response = await request(server)
				.put(`/user/trips/${guideId}/${tripId}`)
				.set('authorization', token)
				.send(update);

			expect(response.body).toBe(1);
		});
	});
	describe('POST /:guideId/create', () => {
		it('should respond with 201 on success', async () => {
			const guideId = 1;
			const addTrip = {
				title: 'testaasdfarossa',
				description: 'This is a test trip again',
				designation: 'professional',
				duration: '3.5 days',
				type: 'Backcountry rock-climbing'
			};
			let response = await request(server)
				.post(`/user/trips/${guideId}/create`)
				.set('authorization', token)
				.send(addTrip);

			expect(response.status).toEqual(201);
		});
		it('should respond with 400 for bad guideId', async () => {
			const guideId = 111;
			const addTrip = {
				title: 'tesasasfdtaso',
				description: 'This is a test trip again',
				designation: 'professional',
				duration: '3.5 days',
				type: 'Backcountry rock-climbing'
			};
			let response = await request(server)
				.post(`/user/trips/${guideId}/create`)
				.set('authorization', token)
				.send(addTrip);

			expect(response.status).toEqual(400);
		});
		it('should respond with 404 for missing req params', async () => {
			const guideId = 1;
			const addTrip = {
				designation: 'professional',
				duration: '3.5 days',
				type: 'Backcountry rock-climbing'
			};
			let response = await request(server)
				.post(`/user/trips/${guideId}/create`)
				.set('authorization', token)
				.send(addTrip);

			expect(response.status).toEqual(404);
		});
		it('should respond with 400 for wrong designation', async () => {
			const guideId = 1;
			const addTrip = {
				title: 'adsfadsg',
				description: 'This is a test trip again',
				designation: 'important',
				duration: '3.5 days',
				type: 'Backcountry rock-climbing'
			};
			let response = await request(server)
				.post(`/user/trips/${guideId}/create`)
				.set('authorization', token)
				.send(addTrip);

			expect(response.status).toEqual(400);
		});
		it('should respond with newly created tripId', async () => {
			const guideId = 1;
			const addTrip = {
				title: 'adfas',
				description: 'This is a test trip again',
				designation: 'professional',
				duration: '3.5 days',
				type: 'Backcountry rock-climbing'
			};
			let response = await request(server)
				.post(`/user/trips/${guideId}/create`)
				.set('authorization', token)
				.send(addTrip);

			expect(response).toBeTruthy();
			expect(typeof response).toEqual('object');
		});
	});
	describe('DELETE /:tripId route', () => {
		it('should respond with 202 success code', async () => {
			let tripId = 40;
			let response = await request(server)
				.delete(`/user/trips/${tripId}/`)
				.set('authorization', token);

			expect(response.status).toBe(202);
		});
		it('should respond with 400 failure code', async () => {
			let tripId = 47;
			let response = await request(server)
				.delete(`/user/trips/${tripId}/`)
				.set('authorization', token);

			expect(response.status).toBe(400);
		});
		it('should respond with the number of items deleted', async () => {
			let tripId = 38;
			let response = await request(server)
				.delete(`/user/trips/${tripId}/`)
				.set('authorization', token);

			expect(response.body).toBe(1);

			tripId = 39;
			response = await request(server)
				.delete(`/user/trips/${tripId}/`)
				.set('authorization', token);

			expect(response.body).toBe(1);
		});
	});
});
