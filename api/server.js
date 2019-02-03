require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const { auth } = require('./middleware');
const protectedRouter = require('./routes/protected/index');
const signInRouter = require('./routes/signinRoutes');

const {
	user: { getUsers }
} = require('./helpers');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/test', async (req, res) => {
	const users = await getUsers();
	res.status(200).json(users);
});

server.use('/user', auth, protectedRouter);
server.use('/auth', signInRouter);

module.exports = server;
