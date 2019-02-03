const knex = require('knex');
const knexConfig = require('../knexfile');
const jwt = require('jsonwebtoken');

const db = knex(knexConfig.development);
const secret = process.env.JWT_SECRET;

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
	generateToken: function(user) {
		const payload = {
			username: user.username
		};
		const options = {
			expiresIn: '24h',
			jwtid: 'Guidr'
		};
		return jwt.sign(payload, secret, options);
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
