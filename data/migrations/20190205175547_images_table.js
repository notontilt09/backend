exports.up = function(knex, Promise) {
	return knex.schema.createTable('images', function(tbl) {
		tbl.increments();
		tbl.string('url', 128).notNullable();
		tbl
			.integer('trip_id')
			.unsigned()
			.references('id')
			.inTable('trips')
			.onDelete('CASCADE');

		tbl.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('images');
};
