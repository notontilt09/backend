const request = require('supertest');
// const bcrypt = require('bcryptjs');

const { auth, user, trip } = require('../api/helpers');
const db = require('../data/dbConfig');

// beforeEach(async () => {
// 	await db('guides').truncate();
// 	await db('guides').insert(seededGuides);
// });

describe('helper function tests', () => {
	describe('auth helper functions', () => {
		// 	it('should register a new user', async () => {
		// 		const addUser = {
		// 			username: '2',
		// 			password: 'test',
		// 			name: '2'
		// 		};
		// 		const id = await auth.register(addUser);
		// 		const person = await db('guides')
		// 			.where({ id: id[0] })
		// 			.first();
		// 		const guides = await db('guides');
		// 		// hash password and compare to password on object that comes back from db (just extra check to be SUPER sure)
		// 		const hash = await auth.hashPass(addUser.password, 14);
		// 		const compare = await bcrypt.compareSync(person.password, hash);
		// 		expect(person.name).toEqual('2');
		// 		expect(person.username).toBe('2');
		// 		expect(person.password).toEqual('test');
		// 		expect(guides).toHaveLength(11);
		// 		expect(compare).toBeTruthy();
		// 	});
		// 	it('should log user in', async () => {
		// 		const user = {
		// 			username: 'sjoskowitz0',
		// 			password: '850RKI7uKgC',
		// 			name: 'Stephannie Joskowitz'
		// 		};
		// 		const guide = await auth.login(user);
		// 		const guides = await db('guides');
		// 		// const hash = await auth.hashPass(user.password, 14);
		// 		const compare = await bcrypt.compareSync(user.password, guide.password);
		// 		expect(guides).toHaveLength(10);
		// 		expect(guide).toBeTruthy();
		// 		expect(compare).toBeTruthy();
		// 		expect(guide.username).toEqual(user.username);
		// 		expect(guide.name).toEqual(user.name);
		// 	});
	});

	describe('user helper functions', () => {
		it('should get all guides', async () => {
			const guides = await user.getUsers();

			expect(guides).toHaveLength(10);
			expect(guides).toBeTruthy();
		});

		it('should get guide by ID', async () => {
			let id = 10;
			let guide = await user.getUserById(id);
			let expected = await db('guides')
				.where({ id })
				.first();
			const guides = await db('guides');

			expect(guide).toBeTruthy();
			expect(guides).toHaveLength(10);
			expect(guide.name).toBe(expected.name);
			expect(guide.username).toEqual(expected.username);
			expect(guide.password).toBe(expected.password);

			id = 1;
			guide = await user.getUserById(id);
			expected = await db('guides')
				.where({ id })
				.first();

			expect(guide).toBeTruthy();
			expect(guide.name).toBe(expected.name);
			expect(guide.username).toEqual(expected.username);
			expect(guide.password).toBe(expected.password);
		});

		it('should update user with new info', async () => {
			let id = 10;
			let updates = {
				tagline: 'wow no way',
				age: 52
			};
			let numUpdated = await user.updateUser(id, updates);
			let guide = await user.getUserById(id);

			expect(numUpdated).toEqual(1);
			expect(numUpdated).toBeTruthy();
			expect(guide.tagline).toEqual(updates.tagline);
			expect(guide.age).toEqual(updates.age);

			id = 1;
			updates = {
				tagline: 'i also like updates',
				age: 24,
				name: 'Janice Janicerson'
			};
			numUpdated = await user.updateUser(id, updates);
			guide = await user.getUserById(id);

			expect(numUpdated).toEqual(1);
			expect(numUpdated).toBeTruthy();
			expect(guide.tagline).toEqual(updates.tagline);
			expect(guide.age).toEqual(updates.age);
			expect(guide.name).toEqual(updates.name);
		});
	});

	describe('trip helper functions', () => {
		it('should get all trips', async () => {
			const expected = await db('trips');
			const trips = await trip.getTrips();

			expect(trips).toHaveLength(40);
			expect(trips.length).toEqual(expected.length);
		});

		it('should get trip by id', async () => {
			let guideId = 1;
			let trips = await trip.getTripsByUser(guideId);
			let expected = await db('trips').where({ guide_id: guideId });

			expect(trips).toBeTruthy();
			expect(trips.length).toEqual(expected.length);
		});

		it('should get trip by id', async () => {
			let tripId = 5;
			let singleTrip = await trip.getTripById(tripId);
			let expected = await db('trips')
				.where({ id: tripId })
				.first();

			expect(singleTrip.length).toEqual(expected.length);
			expect(singleTrip.duration).toEqual(expected.duration);
			expect(singleTrip.title).toBe(expected.title);
			expect(singleTrip.guide_id).toBe(expected.guide_id);
		});

		it('should create a new trip', async () => {
			let testTrip = {
				title: 'Test Title',
				description: 'This is a test',
				duration: '1 minute',
				type: 'Professional',
				guide_id: 1
			};
			let created = await trip.createTrip(testTrip);
			let expected = await db('trips')
				.where({ id: created })
				.first();

			expect(created[0]).toEqual(41);
			expect(testTrip.title).toBe(expected.title);
			expect(testTrip.id).toEqual(created[0]);
			expect(testTrip.type).toEqual(expected.type);
			expect(testTrip.duration).toBe(expected.duration);
		});
	});
});
