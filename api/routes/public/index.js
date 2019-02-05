const express = require('express');
const {
	user: { getUsers },
	trip: { getPublicTrips }
} = require('../../helpers');

const router = express.Router();

router.get('/trips/all', async (req, res) => {
	try {
		const allTrips = await getPublicTrips();
		res.status(200).json(allTrips);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/guides/all', async (req, res) => {
	try {
		const guides = await getUsers();
		res.status(200).json(guides);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
