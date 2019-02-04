const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig');

module.exports.auth = {
	register: function(user) {
		return db('guides').insert(user, 'id');
	},
	login: function(user) {
		return db('guides')
			.where({ username: user.username })
			.first();
	},
	hashPass: function(password, saltNum) {
		return bcrypt.hashSync(password, saltNum);
	},
	generateToken: function(user) {
		const secret = process.env.JWT_SECRET || 'beep boop';
		const payload = {
			username: user.username
		};
		const options = {
			expiresIn: '24h',
			jwtid: 'guidr'
		};
		return jwt.sign(payload, secret, options);
	},
	decodeToken: function(token, callback) {
		const secret = process.env.JWT_SECRET || 'beep boop';
		const options = {
			expiresIn: '24h',
			jwtid: 'guidr'
		};
		if (callback) {
			return jwt.verify(token, secret, options, callback);
		} else {
			return jwt.verify(token, secret, options);
		}
	}
};

module.exports.user = {
	getUsers: function() {
		return db('guides');
	},
	getUserById: function(id) {
		return db('guides')
			.where({ id })
			.first();
	},
	updateUser: function(id, info) {
		return db('guides')
			.where({ id })
			.update(info);
	}
};

module.exports.trip = {
	getTrips: function() {
		return db('trips');
	},
	getById: function(id) {
		return db('trips')
			.where({ id })
			.first();
	},
	getTripsByUser: function(id) {
		return db('trips')
			.where({ guide_id: id })
			.select('id', 'title', 'description', 'img_url');
	},
	getTripByIds: function(tripId, guideId) {
		return db('trips')
			.where({ id: tripId, guide_id: guideId })
			.first();
	},
	createTrip: function(trip) {
		return db('trips').insert(trip, 'id');
	},
	deleteTrip: function(id) {
		return db('trips')
			.where({ id })
			.del();
	},
	updateTrip: function(id, info) {
		return db('trips')
			.where({ id })
			.update(info);
	}
};
