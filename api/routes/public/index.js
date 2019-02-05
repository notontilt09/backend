const express = require('express');
const {
	user: { getUserById },
	trip: { getTripsByUser, getTripByIds, getById, updateTrip, deleteTrip, createTrip, getTrips }
} = require('../../helpers');

const router = express.Router();

router.get('/trips/all', async (req, res) => {
	try {
		const allTrips = await getTrips();
		res.status(200).json(allTrips);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
