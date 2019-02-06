const { onUpdateTrigger } = require('../../knexfile');

exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('comments', function(tbl) {
			tbl.increments();
			tbl
				.string('posted_by', 128)
				.notNullable()
				.references('name')
				.inTable('guides')
				.onDelete('CASCADE');
			tbl
				.integer('trip_id')
				.references('id')
				.inTable('trips')
				.onDelete('CASCADE');
			tbl.string('comment_text', 512).notNullable();
			tbl.timestamp('created_at').defaultTo(knex.fn.now());
			tbl.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.then(() => knex.raw(onUpdateTrigger('comments')));
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('comments');
};
