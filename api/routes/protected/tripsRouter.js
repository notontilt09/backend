const express = require('express');
const { getTripsByUser, updateTrip, deleteTrip, getTripById } = require('../../helpers');

const router = express.Router();

router.get('/:id/all', async (req, res) => {
	const { id } = req.params;
	try {
		const trips = await getTripsByUser(id);
		// console.log(trips);
		if (!trips) {
			res.status(404).json({ error: 'A guide with that ID does not exist' });
		} else {
			res.status(200).json(trips);
		}
	} catch (err) {
		// console.log(err);
		res.status(500).json(err);
	}
});

router.get('/:id/:tripId', async (req, res) => {
	const { tripId } = req.params;
	try {
		const trip = await getTripById(tripId);
		if (!trip) {
			res.status(404).json({ error: 'A trip with that ID does not exist' });
		} else {
			res.status(200).json(trip);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:tripId', async (req, res) => {
	const { tripId } = req.params;
	const updates = req.body;
	try {
		const success = await updateTrip(tripId, updates);
		console.log(success);
		res.status(203).json(success);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
