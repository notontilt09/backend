const express = require('express');
const {
	user: { getUserById },
	trip: { getTripsByUser, getTripByIds, getById, updateTrip, deleteTrip, createTrip }
} = require('../../helpers');
const { hasCorrectKeys, checkDesignation } = require('../../middleware');

const router = express.Router();

router.get('/:guideId/all', async (req, res) => {
	const { guideId } = req.params;
	try {
		const trips = await getTripsByUser(guideId);
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
		const trip = await getTripByIds(tripId, guideId);
		if (!trip) {
			res.status(404).json({ error: 'A trip with that ID does not exist for the specified user' });
		} else {
			res.status(200).json(trip);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:guideId/:tripId', async (req, res) => {
	const { tripId, guideId } = req.params;
	const updates = req.body;

	try {
		const user = await getUserById(guideId);
		const trip = await getById(tripId);
		const connection = await getTripByIds(tripId, guideId);
		if (!user) return res.status(404).json({ error: 'A user with that ID does not exist' });
		if (!trip) return res.status(404).json({ error: 'A trip with that ID does not exist' });
		if (!connection) {
			return res
				.status(400)
				.json({ error: "You must be the trip's guide to make changes to the trip" });
		}

		const success = await updateTrip(tripId, updates);
		res.status(203).json(success);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/:guideId/create', hasCorrectKeys, checkDesignation, async (req, res) => {
	const { guideId } = req.params;
	const tripInfo = req.body;
	try {
		const user = await getUserById(guideId);
		if (!user) return res.status(400).json({ error: 'A user with that ID does not exist' });

		const tripId = tripInfo.guide_id
			? await createTrip(tripInfo)
			: await createTrip({ ...tripInfo, guide_id: user.id });
		const newTrip = await getTripByIds(tripId[0], guideId);
		res.status(201).json(newTrip);
	} catch (err) {
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
