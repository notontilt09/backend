exports.seed = function(knex, Promise) {
	return knex('comments')
		.truncate()
		.then(function() {
			return knex('comments').insert([
				{
					id: 1,
					posted_by: 'Clem Wills',
					trip_id: 1,
					comment_text: 'wow this looks dangerous buddy'
				},
				{
					id: 2,
					posted_by: 'Clem Wills',
					trip_id: 2,
					comment_text: 'oh man, i had the best time on this trip. i did a lot of things'
				},
				{
					id: 3,
					posted_by: 'Mair Whapples',
					trip_id: 2,
					comment_text: 'You seem like you would be a fun guide for a trip!'
				}
			]);
		});
};
