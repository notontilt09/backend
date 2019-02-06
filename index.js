const server = require('./api/server');
const { Client } = require('pg');

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true
});

client.connect();

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server listening on ${port}`));
