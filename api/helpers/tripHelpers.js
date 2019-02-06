const db = require('../../data/dbConfig');

module.exports = {
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
		const guide = db('guides')
			.where({ id: guideId })
			.first();
		const trip = db('trips')
			.where({ id: tripId })
			.first();
		const images = db('images').where({ trip_id: tripId });
		const comments = db('comments').where({ trip_id: tripId });

		return Promise.all([trip, images, guide, comments]).then(results => {
			let [trip, images, guide, comments] = results;

			if (guide === undefined) return [];
			if (trip === undefined) return null;
			if (trip.guide_id !== guide.id) return 'fail';

			images = images.map(item => item.url);
			comments = comments.map(comment => {
				delete comment.trip_id;
				delete comment.id;
				return comment;
			});

			let result = { ...trip, trip_photos: images, comments };
			return result;
		});
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
	},
	addImage: function(image) {
		return db('images').insert(image, 'id');
	}
};
