const express = require('express');
const {
	getTripsByUser,
	getById,
	updateTrip,
	deleteTrip,
	createTrip,
	addImage
} = require('../../helpers/tripHelpers');
const { hasCorrectKeys, checkDesignation, typeCoercion } = require('../../middleware');

const router = express.Router();

router.param('tripId', async function(req, res, next, tripId) {
	const trip = await getById(tripId);
	console.log(trip);
	if (trip) {
		req.trip = trip;
		next();
	} else {
		next(new Error('A trip with that ID does not exist'));
	}
});

router.get('/all', async (req, res, next) => {
	const { guideId } = req;
	try {
		const trips = await getTripsByUser(guideId);
		if (trips.legnth === 0) return res.status(404).json(trips);
		res.status(200).json(trips);
	} catch (err) {
		next({ message: err }, res);
	}
});

router.get('/:tripId', async (req, res, next) => {
	const { trip } = req;
	const { guide } = req.decodedToken;
	try {
		if (trip.guide_id !== guide.id)
			return next({ status: 400, message: 'That trip is not connected to the specified guide ID' });
		res.status(200).json(trip);
	} catch (err) {
		next({ message: err }, res);
	}
});

router.put('/:tripId', typeCoercion, async (req, res, next) => {
	const { trip } = req;
	const { guide } = req.decodedToken;
	const updates = req.body;
	try {
		if (!trip) next({ status: 404, message: 'A trip with that ID does not exist' }, res);
		if (trip.guide_id !== guide.id) {
			next({ status: 400, message: "You must be the trip's guide to make changes" }, res);
		}
		const success = await updateTrip(trip.id, updates);
		res.status(203).json(success);
	} catch (err) {
		next({ message: err }, res);
	}
});

router.post('/:tripId/upload', async (req, res, next) => {
	const { trip } = req;
	const image = req.body;
	try {
		if (!trip) return next({ status: 404, message: 'A trip with that id does not exist' }, res);
		const id = await addImage({ ...image, trip_id: trip.id });
		res.status(201).json(id);
	} catch (err) {
		next({ message: err }, res);
	}
});

router.post('/create', hasCorrectKeys, typeCoercion, checkDesignation, async (req, res, next) => {
	const { guide } = req.decodedToken;
	const tripInfo = req.body;
	try {
		const tripId = await createTrip({ ...tripInfo, guide_id: guide.id });
		res.status(201).json(tripId);
	} catch (err) {
		next({ message: err }, res);
	}
});

router.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const numberRemoved = await deleteTrip(id);
		if (numberRemoved === 0) {
			next({ status: 400, message: 'A trip with that id does not exist' }, res);
		} else {
			res.status(202).json(numberRemoved);
		}
	} catch (err) {
		next({ message: err }, res);
	}
});

module.exports = router;
