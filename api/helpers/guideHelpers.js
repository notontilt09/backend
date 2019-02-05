const db = require('../../data/dbConfig');

module.exports = {
	getUsers: function() {
		return db('guides').select('id', 'name', 'tagline', 'age', 'title', 'careerLength');
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
	deleteUser: function(id) {
		return db('guides')
			.where({ id })
			.del();
	}
};
