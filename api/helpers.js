const knex = require('knex');
const knexConfig = require('../knexfile');
const jwt = require('jsonwebtoken');

const db = knex(knexConfig.development);
const secret = process.env.JWT_SECRET;

module.exports = {
	getTrips: function() {
		return db('trips');
	},
	getTripsByUser: function(id) {
		return db('trips')
			.where({ guide_id: id })
			.select('id', 'title', 'description');
	},
	getTripById: function(id) {
		return db('trips').where({ id });
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
	},
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
	},
	register: function(user) {
		return db('guides').insert(user);
	},
	login: function(user) {
		return db('guides')
			.where({ username: user.username })
			.select('id', 'username as user', 'password', 'name', 'age', 'careerlength as months_worked')
			.first();
	},
	generateToken: function(user) {
		const payload = {
			username: user.username
		};

		const options = {
			expiresIn: '1h',
			jwtid: '12345'
		};
		return jwt.sign(payload, secret, options);
	}
};
