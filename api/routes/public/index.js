const express = require('express');
const { getPublicTrips, getById } = require('../../helpers/tripHelpers');
const { getUsers } = require('../../helpers/guideHelpers');

const router = express.Router();

router.get('/trips/:tripId', async (req, res, next) => {
	const { tripId } = req.params;
	try {
		const trip = await getById(tripId);
		if (!trip) return next({ status: 404, message: 'A trip with that ID does not exist' });
		res.status(200).json(trip);
	} catch (err) {
		next({ message: err }, res);
	}
});

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
