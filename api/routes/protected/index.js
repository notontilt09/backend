const express = require('express');

const tripsRouter = require('./tripsRouter');
const guidesRouter = require('./guidesRouter');
// const errorHandler = require('../../helpers/errorHandler');

const router = express.Router();

router.use('/trips', tripsRouter);
router.use('/guides', guidesRouter);

// router.use(errorHandler);

module.exports = router;
