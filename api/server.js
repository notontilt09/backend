require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const middleware = require('./middleware');
const protectedRouter = require('./routes/protected/index');
const signInRouter = require('./routes/signinRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/user', middleware, protectedRouter);
server.use('/auth', signInRouter);

module.exports = server;
