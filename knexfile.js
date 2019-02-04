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
		}
	},
	production: {
		client: 'pg',
		connection: process.env.DB_URL,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		useNullAsDefault: true
	}
};
