exports.up = function(knex, Promise) {
	return knex.schema.createTable('trips', function(tbl) {
		tbl.increments();
		tbl
			.string('title', 128)
			.notNullable()
			.unique();
		tbl.string('description', 512).notNullable();
		tbl.string('designation', 128).defaultTo('Professional');
		tbl
			.string('type', 128)
			.notNullable()
			.defaultTo('Outdoor adventure!');
		tbl
			.string('duration', 128)
			.notNullable()
			.defaultTo('3 days');
		tbl
			.integer('guide_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('guides')
			.onDelete('CASCADE');
		tbl
			.string('img_url', 256)
			.defaultTo(
				'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
			);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('trips');
};
