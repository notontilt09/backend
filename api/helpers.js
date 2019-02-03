const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig');

module.exports.auth = {
	register: function(user) {
		return db('guides').insert(user);
	},
	login: function(user) {
		return db('guides')
			.where({ username: user.username })
			.select('id', 'username', 'password', 'name', 'age', 'careerlength as guide_exp')
			.first();
	},
	hashPass: function(password, saltNum) {
		return bcrypt.hashSync(password, saltNum);
	},
	generateToken: function(user) {
		const payload = {
			username: user.username
		};
		const options = {
			expiresIn: '24h',
			jwtid: 'Guidr'
		};
		return jwt.sign(payload, process.env.JWT_SECRET, options);
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
	getTripsByUser: function(id) {
		return db('trips')
			.where({ guide_id: id })
			.select('id', 'title', 'description', 'img_url');
	},
	getTripById: function(id) {
		return db('trips')
			.where({ id })
			.first();
	},
	createTrip: function(trip) {
		return db('trips').insert(trip);
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
