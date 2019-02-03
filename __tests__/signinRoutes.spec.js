const request = require('supertest');
const server = require('../api/server');

describe('Sign In Route Tests (/auth routes)', () => {
	describe('POST /register route', () => {
		it('should respond with status code 201', async () => {
			let response = await request(server)
				.post('/auth/register')
				.send({ username: 'testy', password: '1', name: 'TestMe' });

			expect(response.status).toBe(201);
			expect(response.type).toMatch(/json/i);
		});
	});
});
