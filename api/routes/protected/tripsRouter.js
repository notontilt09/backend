const express = require('express');
const {
	user: { getUserById },
	trip: { getTripsByUser, getTripById, updateTrip, deleteTrip, createTrip }
} = require('../../helpers');
const { hasCorrectKeys, checkDesignation } = require('../../middleware');

const router = express.Router();

router.get('/:id/all', async (req, res) => {
	const { id } = req.params;
	try {
		const trips = await getTripsByUser(id);
		if (trips.length === 0) {
			res.status(404).json({ error: 'A guide with that ID does not exist' });
		} else {
			res.status(200).json(trips);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:guideId/:tripId', async (req, res) => {
	const { tripId, guideId } = req.params;
	try {
		const trip = await getTripById(tripId, guideId);
		if (!trip) {
			res.status(404).json({ error: 'A trip with that ID does not exist for the specified user' });
		} else {
			res.status(200).json(trip);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id/:tripId', async (req, res) => {
	const { tripId, id } = req.params;
	const updates = req.body;

	try {
		const user = await getUserById(id);
		const trip = await getTripById(tripId);

		if (!user) return res.status(404).json({ error: 'A user with that ID does not exist' });

		if (trip.guide_id !== user.id)
			return res
				.status(400)
				.json({ error: "You must be the trip's guide to make changes to the trip" });

		const success = await updateTrip(tripId, updates);

		if (success === 0) {
			res.status(404).json({ error: 'A trip with that ID does not exist' });
		} else {
			res.status(203).json(success);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/:userId/create', hasCorrectKeys, checkDesignation, async (req, res) => {
	const { userId } = req.params;
	const tripInfo = req.body;
	try {
		const user = await getUserById(userId);
		if (!user) return res.status(400).json({ error: 'A user with that ID does not exist' });

		const id = await createTrip({ ...tripInfo, guide_id: user.id });
		if (!id) {
			res.status(400).json({ error: 'Please include' });
		} else {
			const newTrip = await getTripById(id[0]);
			res.status(201).json(newTrip);
		}
	} catch (err) {
		if (err.errno === 19)
			return res.status(400).json({ error: 'A trip with that title already exists' });
		res.status(500).json(err);
	}
});

router.delete('/:tripId', async (req, res) => {
	const { tripId } = req.params;
	try {
		const numberRemoved = await deleteTrip(tripId);
		if (numberRemoved === 0) {
			res.status(400).json({ error: 'A trip with that ID does not exist' });
		} else {
			res.status(202).json(numberRemoved);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
