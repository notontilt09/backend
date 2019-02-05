const db = require('../../data/dbConfig');

module.exports.trip = {
	getTrips: function() {
		return db('trips');
	},
	getPublicTrips: function() {
		return db('trips').where({ designation: 'Professional' });
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
