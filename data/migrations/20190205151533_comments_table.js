const { onUpdateTrigger } = require('../../knexfile');

exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('comments', function(tbl) {
			tbl.increments();
			tbl
				.string('user', 128)
				.notNullable()
				.references('username')
				.inTable('guides')
				.onDelete('CASCADE');
			tbl
				.string('name')
				.notNullable()
				.references('name')
				.inTable('guides')
				.onDelete('CASCADE');
			tbl
				.integer('age')
				.unsigned()
				.references('age')
				.inTable('guides')
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
