exports.up = function(knex, Promise) {
	return knex.schema.createTable('trips', function(tbl) {
		tbl.increments();
		tbl
			.string('title', 128)
			.notNullable()
			.unique();
		tbl.string('description', 512).notNullable();
		tbl.string('designation', 128).notNullable();
		tbl.string('type', 128).notNullable();
		tbl
			.integer('duration_in_hrs')
			.unsigned()
			.notNullable();
		tbl
			.integer('guide_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users');
		tbl.string('img_url', 256);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('trips');
};
