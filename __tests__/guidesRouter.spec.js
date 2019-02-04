const request = require('supertest');
const server = require('../api/server');
const {
	user: { getUserById }
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

describe('Guide router tests (/user routes)', () => {
	describe('PUT /user/update/:id route', () => {
		it('should send back 200 status code for success', async () => {
			let id = 10;
			let updatedGuide = {
				tagline: "I'm the best guide this side of Mt. Everest",
				careerLength: '6 years',
				age: 27
			};
			const response = await request(server)
				.put(`/user/guides/update/${id}`)
				.set('authorization', token)
				.send(updatedGuide);
			const expected = await getUserById(id);

			expect(response.status).toBe(200);
			expect(updatedGuide.tagline).toEqual(expected.tagline);
			expect(updatedGuide.age).toBe(expected.age);
		});
		it('should 401 for bad token', async () => {
			let id = 10;
			let updatedGuide = {
				tagline: "I'm the best guide this side of Mt. Everest",
				careerLength: '6 years',
				age: 27
			};
			//everything fine but the invalid token
			const response = await request(server)
				.put(`/user/guides/update/${id}`)
				.set('authorization', ';asdkfja;')
				.send(updatedGuide);

			expect(response.status).toBe(401);
		});
		it('should 400 for bad id', async () => {
			let id = 100;
			let updatedGuide = {
				tagline: "I'm the best guide this side of Mt. Everest",
				careerLength: '6 years',
				age: 27
			};
			//valid token, but invalid user id
			const response = await request(server)
				.put(`/user/guides/update/${id}`)
				.set('authorization', token)
				.send(updatedGuide);

			expect(response.status).toBe(400);
		});
	});
});
