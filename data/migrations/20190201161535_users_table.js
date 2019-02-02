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
		tbl.integer('age').unsigned();
		tbl.string('tagline', 256).defaultTo('the best guide youve never heard of');
		tbl.string('careerLength').defaultTo('6 months');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('guides');
};
