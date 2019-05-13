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
		connection: {
			filename: './data/guidr.db3'
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		},
		useNullAsDefault: true
	},
	onUpdateTrigger: table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
};
