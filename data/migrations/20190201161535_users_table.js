exports.up = function(knex, Promise) {
	return knex.schema.createTable('guides', function(tbl) {
		tbl.increments();
		tbl
			.string('username', 128)
			.notNullable()
			.unique();
		tbl.string('password', 256).notNullable();
		tbl
			.string('name', 128)
			.unique()
			.notNullable();
		tbl
			.integer('age')
			.unsigned()
			.defaultTo(25);
		tbl.string('title').defaultTo('Expert Guide');
		tbl.string('tagline', 256);
		tbl.string('careerLength', 128);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('guides');
};
