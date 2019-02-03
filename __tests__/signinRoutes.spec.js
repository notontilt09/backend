const request = require('supertest');

const {
	auth: { register, login }
} = require('../api/helpers');
const { guideSeed } = require('../data/seeds/users');
const server = require('../api/server');
const db = require('../data/dbConfig');

afterEach(async () => {
	const guides = await db('guides');
	if (guides.length > 10) {
		await db('guides').truncate();
		await db('guides').insert(guideSeed);
	}
});

describe('Sign In Route Tests (/auth routes)', () => {
	describe('POST /register route', () => {
		it('should respond with object & status code 201', async () => {
			let response = await request(server)
				.post('/auth/register')
				.send({ username: 'testy', password: '1', name: 'TestMe' });

			expect(response.status).toBe(201);
			expect(response.type).toMatch(/json/i);
		});

		it('should send back object with token and user', async () => {
			let response = await request(server)
				.post('/auth/register')
				.send({ username: 'testy', password: '1', name: 'TestMe' });
		});
	});
});
