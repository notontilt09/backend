const express = require('express');

const tripsRouter = require('./tripsRouter');
const guidesRouter = require('./guidesRouter');

const router = express.Router();

router.use('/trips', tripsRouter);
router.use('/guides', guidesRouter);

module.exports = router;
