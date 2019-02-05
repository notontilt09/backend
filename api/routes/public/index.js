const express = require('express');
const { getPublicTrips } = require('../../helpers/tripHelpers');
const { getUsers } = require('../../helpers/guideHelpers');

const router = express.Router();

router.get('/trips/all', async (req, res, next) => {
	try {
		const allTrips = await getPublicTrips();
		res.status(200).json(allTrips);
	} catch (err) {
		next({ message: err }, res);
	}
});

router.get('/guides/all', async (req, res, next) => {
	try {
		const guides = await getUsers();
		res.status(200).json(guides);
	} catch (err) {
		next({ message: err }, res);
	}
});

module.exports = router;
