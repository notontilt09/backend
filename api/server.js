require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { verifyAuth } = require('./middleware');
const protectedRouter = require('./routes/protected/index');
const signInRouter = require('./routes/signinRoutes');
const publicRouter = require('./routes/public/index');
const errorHandler = require('./helpers/errorHandler');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/user', verifyAuth, protectedRouter);
server.use('/auth', signInRouter);
server.use('/guidr', publicRouter);

server.use(errorHandler);

module.exports = server;
