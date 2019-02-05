const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const { auth, user, trip } = require('../api/helpers');
const auth = require('../api/helpers/authHelpers');
const user = require('../api/helpers/guideHelpers');
const trip = require('../api/helpers/tripHelpers');
const { guideSeed } = require('../data/seeds/01_users');
const { tripSeed } = require('../data/seeds/02_trips');
const db = require('../data/dbConfig');

afterEach(async () => {
	const guides = await db('guides');
	const trips = await db('trips');
	if (guides.length !== 10) {
		await db('guides').truncate();
		await db('guides').insert(guideSeed);
	}
	if (trips.length !== 40) {
		await db('trips').truncate();
		await db('trips').insert(tripSeed);
	}
});

describe('helper function tests', () => {
	describe('auth helper functions', () => {
		it('should register a new user', async () => {
			const addUser = {
				username: '2',
				password: 'test',
				name: '2'
			};
			const id = await auth.register(addUser);
			const person = await db('guides')
				.where({ id: id[0] })
				.first();
			const guides = await db('guides');

			// hash password and compare to password on object that comes back from db (just extra check to be SUPER sure)
			const hash = await auth.hashPass(addUser.password, 14);
			const compare = await bcrypt.compareSync(person.password, hash);

			expect(person.name).toEqual('2');
			expect(person.username).toBe('2');
			expect(person.password).toEqual('test');
			expect(guides).toHaveLength(11);
			expect(compare).toBeTruthy();
		});

		it('should log user in', async () => {
			const user = {
				username: 'sjoskowitz0',
				password: '850RKI7uKgC',
				name: 'Stephannie Joskowitz'
			};
			const guide = await auth.login(user);
			const guides = await db('guides');
			const compare = await bcrypt.compareSync(user.password, guide.password);

			expect(guides).toHaveLength(10);
			expect(guide).toBeTruthy();
			expect(compare).toBeTruthy();
			expect(guide.username).toEqual(user.username);
			expect(guide.name).toEqual(user.name);
		});

		it('should generate jwtToken', async () => {
			const secret = process.env.JWT_SECRET || 'beep boop';
			const testGuide = {
				username: 'testerrrr'
			};
			const options = {
				expiresIn: '24h',
				jwtid: 'guidr'
			};

			const token = await auth.generateToken(testGuide);
			const expected = await jwt.sign(testGuide, secret, options);
			const decoded = await jwt.verify(token, secret, options);

			expect(token).toBeTruthy();
			expect(decoded.username).toEqual(testGuide.username);
			expect(decoded.jti).toBe('guidr');
			expect(token).toEqual(expected);
		});

		it('should verify token', async () => {
			const secret = process.env.JWT_SECRET || 'beep boop';
			const testGuide = {
				username: 'testerrrr'
			};
			const options = {
				expiresIn: '24h',
				jwtid: 'guidr'
			};

			const token = await auth.generateToken(testGuide);
			const decoded = await auth.decodeToken(token);
			const jwtDecoded = await jwt.verify(token, secret, options);

			expect(decoded.jti).toEqual(jwtDecoded.jti);
			expect(decoded.iat).toEqual(jwtDecoded.iat);
			expect(decoded.exp).toEqual(jwtDecoded.exp);
			expect(decoded.username).toBe(jwtDecoded.username);
		});
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
				careerLength: '2 days'
			};
			numUpdated = await user.updateUser(id, updates);
			guide = await user.getUserById(id);

			expect(numUpdated).toEqual(1);
			expect(numUpdated).toBeTruthy();
			expect(guide.tagline).toEqual(updates.tagline);
			expect(guide.age).toEqual(updates.age);
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
			let guideId = 1;
			let singleTrip = await trip.getTripByIds(tripId, guideId);
			let expected = await db('trips')
				.where({ id: tripId, guide_id: guideId })
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
				type: 'Leisure Hiking, Sightseeing',
				guide_id: 1
			};
			let created = await trip.createTrip(testTrip);
			let expected = await db('trips')
				.where({ id: created[0] })
				.first();

			expect(created[0]).toEqual(expected.id);
			expect(testTrip.title).toBe(expected.title);
			expect(testTrip.guide_id).toEqual(expected.guide_id);
			expect(testTrip.type).toEqual(expected.type);
			expect(testTrip.duration).toBe(expected.duration);
		});

		it('should delete an existing trip', async () => {
			let id = 41;
			let numDeleted = await trip.deleteTrip(id);
			let expected = await db('trips')
				.where({ id })
				.del();
			let trips = await trip.getTrips();

			expect(numDeleted).toBe(expected);
			expect(trips.length).toEqual(40);
		});

		it('should update an existing trip', async () => {
			let id = 1;
			let updatedTrip = {
				title: 'Updated!',
				type: 'Incredibly unenjoyable',
				description: 'Testing is sucking the soul right out of my body. Please kill me'
			};
			let numUpdated = await trip.updateTrip(id, updatedTrip);
			let expected = await db('trips')
				.where({ id })
				.first();

			expect(numUpdated).toEqual(1);
			expect(numUpdated).toBeTruthy();
			expect(updatedTrip.title).toBe(expected.title);
			expect(updatedTrip.description).toEqual(expected.description);
			expect(updatedTrip.type).toEqual(expected.type);
		});
	});
});
