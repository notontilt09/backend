const request = require('supertest');

const { auth, user, trip } = require('../api/helpers');
const db = require('../data/dbConfig');

afterEach(async () => {
	await db('users').truncate();
});

describe('helper function tests', () => {
	describe('auth helper functions', () => {
		it('should register a new user', async () => {
			const addUser = {
				username: '1',
				password: 'test',
				name: '1'
			};
			const id = await auth.register(addUser);
			const person = await user.getUserById(id);
			const guides = await db('guides');

			console.log(guides, id, person);

			console.log(process.env.DB_ENV);

			expect(person.name).toEqual('Bob');
			expect(guides).toHaveLength(11);
		});
	});
});
