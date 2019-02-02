require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const middleware = require('./middleware');
const protectedRouter = require('./routes/protectedRoutes');
const signInRouter = require('./routes/signinRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/guide', middleware, protectedRouter);
server.use('/guidr', signInRouter);

module.exports = server;
