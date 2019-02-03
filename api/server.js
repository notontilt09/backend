require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const { auth } = require('./middleware');
const protectedRouter = require('./routes/protected/index');
const signInRouter = require('./routes/signinRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/user', auth, protectedRouter);
server.use('/auth', signInRouter);

module.exports = server;
