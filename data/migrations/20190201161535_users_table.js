exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(tbl) {
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
		tbl.integer('age').unsigned();
		// .notNullable();
		tbl.string('tagline', 256);
		tbl.integer('careerLength').unsigned();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
