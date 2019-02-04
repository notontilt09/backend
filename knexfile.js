require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/guidr.db3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		pool: {
			afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
		}
	},
	testing: {
		client: 'sqlite3',
		connection: {
			filename: './data/test-guidr.db3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		pool: {
			afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
		}
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		useNullAsDefault: true
	}
};
