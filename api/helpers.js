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
		return db('trips').where({ user_id: id });
		// .first();
	},
	register: function(user) {
		return db('users').insert(user);
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
	},
	login: function(user) {
		return db('users')
			.where({ username: user.username })
			.select('id', 'username', 'name')
			.first();
	}
	// secret
};
